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
        [HttpGet, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<GetAdsCreateRequestDto>>> GetAllCreateRequest()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Something went wrong with your account. Please login again!",
                });
            }

            var rawResult = await _context.AdsCreationRequests
                .Include(x => x.AdsBoard)
                .ToListAsync();

            var myResult = new List<GetAdsCreateRequestDto>();
            foreach (var item in rawResult)
            {
                myResult.Add(new GetAdsCreateRequestDto() {
                    RequestAddress = _context.AdsPoints.Find(item.AdsPointId)?.Address ?? "No Address"
                });
            }

            myResult = myResult.Where(r => Helper.IsUnderAuthority(r.RequestAddress, acc.UnitUnderManagement)).ToList();
            return myResult;
        }

        //POST: api/officer/ads-request
        [HttpPost, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer)]
        public async Task<IActionResult> PostCreateRequest(AdsCreateRequestDto createRequest)
        {
            var request = _mapper.Map<AdsCreationRequest>(createRequest);
            var boardList = request.AdsBoard;

            if (boardList is not null)
            {
                request.AdsBoard = null;
            }

            if (_context.AdsCreationRequests == null)
            {
                return Problem("Entity set 'DataContext.AdsCreationRequest' is null.");
            }

            var tempPoint = await _context.AdsPoints.FindAsync(request.AdsPointId);
            request.RequestStatus = RequestStatusConstant.Unconfirm;
            _context.AdsCreationRequests.Add(request);

            try
            {
                await _context.SaveChangesAsync();

                if (tempPoint != null && tempPoint.Id != 0 && boardList != null)
                {
                    if (_context.AdsPoints.Any(e => e.Id == tempPoint.Id))
                    {
                        foreach (var board in boardList)
                        {
                            board.AdsPointId = tempPoint.Id;
                            board.AdsCreateRequestId = request.Id;
                            _context.AdsBoards.Add(board);
                        }
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

        // DELETE: api/officer/ads-request
        [HttpDelete, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteRequest([FromQuery, Required] int id)
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

            if (adsCreateRequest.RequestStatus == RequestStatusConstant.Unconfirm)
            {
                if (acc.Role != GlobalConstant.HeadQuater)
                {
                    adsCreateRequest.RequestStatus = RequestStatusConstant.Deleted;
                } else
                {
                    adsCreateRequest.RequestStatus = RequestStatusConstant.Confirm;
                }
            } else if (acc.Role == GlobalConstant.HeadQuater)
            {
                adsCreateRequest.RequestStatus = adsCreateRequest.RequestStatus == RequestStatusConstant.Deleted ?
                    RequestStatusConstant.Confirm : RequestStatusConstant.Deleted;
            }
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Thành công thay đổi trạng thái của Yêu cầu Cấp phép."
            });
        }

        // -------------------------

        [HttpPost("point-modification")]
        public async Task<ActionResult<PointModify>> PointModify(PointModify PointModifyRequest)
        {
            _context.PointModifies.Add(PointModifyRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PointModify", new { id = PointModifyRequest.Id }, PointModifyRequest);
        }

        //public async Task<ActionResult<BoardModify>> BoardModify(BoardModify BoardModifyRequest)
        //{
        //    _context.BoardModifies.Add(BoardModifyRequest);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("BoardModify", new { id = BoardModifyRequest.Id }, BoardModifyRequest);
        //}

        [HttpGet("ad-request")] // ?
        public async Task<ActionResult<AdsCreationRequest>> GetAdsBoardRequestDetail([FromQuery] int id)
        {
            if (_context.AdsCreationRequests == null)
            {
                return NotFound();
            }

            AdsCreationRequest? result = null;
            var rawRequest = await _context.AdsCreationRequests
                .Include(s => s.AdsBoard)
                .ToListAsync();

            foreach (var req in rawRequest)
            {
                var value = req.AdsBoard?.AsQueryable().Where(b => b.Id == id);
                if (!value.IsNullOrEmpty())
                {
                    result = req;
                    break;
                }
            }

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        private bool CreateRequestExists(int id)
        {
            return (_context.AdsCreationRequests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
