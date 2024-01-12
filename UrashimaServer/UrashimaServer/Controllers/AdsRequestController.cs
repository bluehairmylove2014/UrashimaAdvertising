using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller xử lý yêu cầu tạo mới bảng quảng cáo.
    /// </summary>
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

        /// <summary>
        /// API lấy danh sách các yêu cầu tạo mới bảng quảng cáo.
        /// </summary>
        // GET: api/officer/ads-request
        [HttpGet, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<GetAdsCreateRequestDto>>> GetAllCreateRequest()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            var rawResult = await _context.AdsCreationRequests
                .Where(x => x.RequestStatus.Equals(RequestConstant.Inprogress))
                .Include(x => x.AdsBoard)
                .Include(x => x.AdsPoint)
                .ToListAsync();

            var myResult = new List<GetAdsCreateRequestDto>();
            foreach (var item in rawResult)
            {
                var toAddRes = _mapper.Map<GetAdsCreateRequestDto>(item);
                var pointToFind = _context.AdsPoints.Find(item.AdsPointId);
                toAddRes.AdsPoint = _mapper.Map<AdsCreateRequestPointDto>(pointToFind!);
                toAddRes.AdsPoint.IsEmpty = toAddRes.AdsBoard == null;
                myResult.Add(toAddRes);
            }

            var region = HttpContext.Items["address"] as string;
            myResult = myResult.Where(item =>
            {
                var RequestAddress = _context.AdsPoints.Find(item.AdsPointId)!.Address;
                return Helper.IsUnderAuthority(RequestAddress, acc.UnitUnderManagement, region);
            }).ToList();

            return myResult;
        }

        /// <summary>
        /// API yêu cầu tạo mới bảng quảng cáo.
        /// </summary>
        //POST: api/officer/ads-request/board
        [HttpPost("board"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer)] 
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
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var tempPoint = await _context.AdsPoints.FindAsync(createRequest.AdsPointId);
            if (tempPoint == null)
            {
                return BadRequest(new {
                    message = "Điểm quảng cáo không tồn tại"
                });
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
                message = "Gửi yêu cầu tạo bảng quảng cáo cho công ty thành công."
            });
        }

        /// <summary>
        /// API xóa yêu cầu tạo mới bảng quảng cáo nếu chưa xử lý.
        /// </summary>
        // DELETE: api/officer/ads-request
        [HttpDelete, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ChangeRequestStatus([FromQuery, Required] int id)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Tài khoản của bạn đã bị lỗi. Vui lòng đăng nhập!",
                });
            }

            if (_context.AdsCreationRequests == null)
            {
                return NotFound(new
                {
                    Message = "Không thể kết nối đến cơ sở dữ liệu",
                });
            }

            var adsCreateRequest = await _context.AdsCreationRequests.FindAsync(id);
            if (adsCreateRequest == null)
            {
                return NotFound(new
                {
                    Message = $"Không tìm thấy Yêu cầu với id={id}",
                });
            }

            if (adsCreateRequest.RequestStatus == RequestConstant.Inprogress)
            {
                if (acc.Role == GlobalConstant.HeadQuater)
                {
                    
                } else
                {
                    _context.AdsCreationRequests.Remove(adsCreateRequest);
                }
            }
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Thành công xóa yêu cầu id={id}."
            });
        }

        private bool CreateRequestExists(int id)
        {
            return (_context.AdsCreationRequests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
