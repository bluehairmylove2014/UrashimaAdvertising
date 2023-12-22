using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace UrashimaServer.Controllers
{
    [Route("api/officer/ads-request")]
    [ApiController]
    public class AdsRequestController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AdsRequestController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/officer/ads-request
        [HttpGet] // , AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)
        public async Task<ActionResult<IEnumerable<GetAdsCreateRequestDto>>> GetAllCreateRequest()
        {
            //var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            //if (acc is null)
            //{
            //    return BadRequest(new
            //    {
            //        Message = "Something went wrong with your account. Please login again!",
            //    });
            //}

            var rawResult = await _context.AdsCreationRequests
                .Include(x => x.AdsBoard)
                .Include(x => x.AdsPoint)
                .ToListAsync();

            var myResult = new List<GetAdsCreateRequestDto>();
            foreach (var item in rawResult)
            {
                var toAddRes = _mapper.Map<GetAdsCreateRequestDto>(item);
                myResult.Add(toAddRes);
            }

            //myResult = myResult.Where(item =>
            //{
            //    var RequestAddress = _context.AdsPoints.Find(item.AdsPointId)?.Address ?? "No Address";
            //    return Helper.IsUnderAuthority(RequestAddress, acc.UnitUnderManagement);
            //}).ToList();

            return myResult;
        }

        //POST: api/officer/ads-request
        [HttpPost("board")] // , AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer)
        public async Task<IActionResult> PostCreateRequestForBoard(AdsCreateBoardRequestDto createRequest)
        {
            var request = _mapper.Map<AdsCreationRequest>(createRequest);
            var board = request.AdsBoard;

            if (board is not null)
            {
                request.AdsBoard = null;
            }

            if (_context.AdsCreationRequests == null)
            {
                return Problem("'DataContext.AdsCreationRequest' là null.");
            }

            var tempPoint = await _context.AdsPoints.FindAsync(request.AdsPointId);
            if (tempPoint == null)
            {
                return BadRequest("Điểm quảng cáo không tồn tại");
            }

            request.RequestStatus = RequestConstant.Inprogress;

            try
            {
                _context.AdsCreationRequests.Add(request);
                await _context.SaveChangesAsync();

                if (tempPoint.Id != 0 && board != null)
                {
                    if (_context.AdsPoints.Any(e => e.Id == tempPoint.Id))
                    {
                        board.AdsPointId = tempPoint.Id;
                        board.AdsCreateRequestId = request.Id;
                        board.ExpiredDate = request.ContractEnd;
                        _context.AdsBoards.Add(board);
                    };
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CreateRequestExists(request.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new {
                message = "Ok"
            });
        }

        //POST: api/officer/ads-request
        //[HttpPost("point")] // , AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer)
        //public async Task<IActionResult> PostCreateRequestForPoint(AdsCreatePointRequestDto createRequest)
        //{
        //    var request = _mapper.Map<AdsCreationRequest>(createRequest);
        //    var adsPoint = request.AdsPoint;
        //    request.AdsPoint = null;
        //    request.AdsBoard = null;

        //    if (adsPoint == null)
        //    {
        //        return BadRequest("Thiếu dữ liệu điểm quảng cáo.");
        //    }

        //    if (_context.AdsCreationRequests == null)
        //    {
        //        return Problem("Entity set 'DataContext.AdsCreationRequest' is null.");
        //    }

        //    request.RequestStatus = RequestConstant.Inprogress;

        //    try
        //    {
        //        _context.AdsPoints.Add(adsPoint);
        //        await _context.SaveChangesAsync();

        //        request.AdsPointId = adsPoint.Id;;
        //        _context.AdsCreationRequests.Add(request);
        //        await _context.SaveChangesAsync();

        //        adsPoint.AdsCreateRequestId = request.Id;
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (CreateRequestExists(request.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Ok(new
        //    {
        //        message = "Ok"
        //    });
        //}

        // DELETE: api/officer/ads-request
        [HttpDelete, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ChangeRequestStatus([FromQuery, Required] int id)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Something went wrong with your account. Please login again!",
                });
            }

            if (_context.AdsCreationRequests == null)
            {
                return NotFound();
            }
            var adsCreateRequest = await _context.AdsCreationRequests.FindAsync(id);
            if (adsCreateRequest == null)
            {
                return NotFound();
            }

            if (adsCreateRequest.RequestStatus == RequestConstant.Inprogress)
            {
                if (acc.Role == GlobalConstant.HeadQuater)
                {
                    adsCreateRequest.RequestStatus = RequestConstant.Rejected;
                }
            }
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Thành công."
            });
        }

        private bool CreateRequestExists(int id)
        {
            return (_context.AdsCreationRequests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
