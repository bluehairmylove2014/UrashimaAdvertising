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
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Ward
{
    /// <summary>
    /// Controller quản lý cho vai trò Officer.
    /// </summary>
    [Route("api/officer")]
    [ApiController]
    public class OfficerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OfficerController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// API Officer lấy chi tiết bảng quảng cáo bằng id.
        /// </summary>
        [HttpGet("ads-board/detail"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsBoardBasicDto>> GetOfficerAdsBoardDetail([FromQuery, Required] int id)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            if (_context.AdsBoards == null)
            {
                return NotFound();
            }
            var adsBoard = await _context.AdsBoards
                .Where(b => b.Id == id)
                .Include(b => b.AdsPoint).FirstOrDefaultAsync();
            var region = HttpContext.Items["address"] as string;

            if (adsBoard is null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy bảng quảng cáo."
                });
            }
            else if (
                !acc.Role.Equals(GlobalConstant.HeadQuater) &&
                !Helper.IsUnderAuthority(adsBoard.AdsPoint!.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    message = "Chi tiết bảng quảng cáo không thuộc thẩm quyền."
                });
            }

            var res = _mapper.Map<AdsBoardBasicDto>(adsBoard);

            return res;
        }

        /// <summary>
        /// API Officer lấy danh sách bảng quảng cáo.
        /// </summary>
        [HttpGet("ads-board"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsBoard>>> GetOfficerAdsBoards()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            var rawBoards = await _context.AdsBoards
                .Where(board => board.AdsCreateRequest == null
                    || board.AdsCreateRequest.RequestStatus == RequestConstant.Accepted)
                .Include(s => s.AdsPoint)
                .Include(s => s.AdsCreateRequest)
                .Include(s => s.Reports)
                .ToListAsync();

            var region = HttpContext.Items["address"] as string;
            var result = rawBoards
                .Where(r => Helper.IsUnderAuthority(r.AdsPoint!.Address, acc.UnitUnderManagement, region));
                // .Select(board => board.AdsCreateRequest?.RequestStatus);

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in result)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }

        /// <summary>
        /// API Officer lấy danh sách điểm quảng cáo.
        /// </summary>
        [HttpGet("ads-point"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<UserAdsPointBasicDto>>> GetAllOfficerAdsPoints()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            var rawResult = await _context.AdsPoints
                .Where(point => point.AdsCreateRequest == null
                    || point.AdsCreateRequest.RequestStatus == RequestConstant.Accepted)
                .ToListAsync();

            var region = HttpContext.Items["address"] as string;
            rawResult = rawResult.Where(p =>
                Helper.IsUnderAuthority(p.Address, acc.UnitUnderManagement, region))
            .ToList();

            var res = new List<UserAdsPointBasicDto>();
            foreach (var item in rawResult)
            {
                var pointDto = _mapper.Map<UserAdsPointBasicDto>(item);
                res.Add(pointDto);
            }

            return res;
        }

        /// <summary>
        /// API Officer lấy chi tiết điểm quảng cáo.
        /// </summary>
        [HttpGet("ads-point/detail"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<UserAdsPointDetailDto>> GetOfficerAdsPoint([FromQuery] int id)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            if (_context.AdsPoints == null)
            {
                return NotFound();
            }

            var adsPoint = await _context.AdsPoints
                .Where(adsPoint => adsPoint.Id == id)
                .Include(s => s.AdsBoard)
                .Include(s => s.Images)
                .FirstOrDefaultAsync();

            var region = HttpContext.Items["address"] as string;
            if (adsPoint == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy điểm quảng cáo."
                });
            }

            if (!acc.Role.Equals(GlobalConstant.HeadQuater) 
                && !Helper.IsUnderAuthority(adsPoint.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    message = "Chi tiết địa điểm không thuộc thẩm quyền."
                });
            }

            var res = _mapper.Map<UserAdsPointDetailDto>(adsPoint);

            return res;
        }

        // -------------------------


        /// <summary>
        /// API Officer tạo yêu cầu chỉnh sửa bảng quảng cáo.
        /// </summary>
        [HttpPost("ads-modification/point"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<PointModifyDto>> PointModify(PointModifyDto pointModifyRequest)
        {
            var result = _mapper.Map<PointModify>(pointModifyRequest);

            result.AdsPointId = result.Id;
            result.Id = 0;
            result.ModifyTime = DateTime.Now;
            if (result.Images != null)
            {
                foreach (var item in result.Images)
                {
                    item.AdsPointId = pointModifyRequest.Id;
                }
            }
            if (result.AdsBoard != null)
            {
                foreach (var item in result.AdsBoard)
                {
                    item.AdsBoardId = item.Id;
                    item.Id = 0;
                }
            }

            _context.PointModifies.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Tạo yêu cầu chỉnh sửa điểm quảng cáo thành công"
            });
        }

        /// <summary>
        /// API Officer xóa yêu cầu chỉnh sửa bảng quảng cáo khi chưa được duyệt.
        /// </summary>
        [HttpDelete("ads-modification"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeletePointModify([FromQuery, Required] int id)
        {
            var pointToRemove = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pointToRemove == null)
            {
                return BadRequest(new
                {
                    message = $"Không thể tìm được yêu cầu chỉnh sửa có id={id}."
                });
            }

            _context.PointModifyImages.RemoveRange(pointToRemove.Images!);
            _context.BoardModifies.RemoveRange(pointToRemove.AdsBoard!);
            _context.PointModifies.Remove(pointToRemove);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Xóa yêu cầu chỉnh sửa điểm quảng cáo thành công"
            });
        }

        //public async Task<ActionResult<BoardModify>> BoardModify(BoardModify BoardModifyRequest)
        //{
        //    _context.BoardModifies.Add(BoardModifyRequest);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("BoardModify", new { id = BoardModifyRequest.Id }, BoardModifyRequest);
        //}
    }
}