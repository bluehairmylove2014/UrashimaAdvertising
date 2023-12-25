using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Ward
{
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

        [HttpGet("ads-board/detail"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsBoardBasicDto>> GetOfficerAdsBoardDetail([FromQuery] int id)
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
            if (adsBoard is null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy bảng quảng cáo."
                });
            } else if (!Helper.IsUnderAuthority(adsBoard.AdsPoint!.Address, acc.UnitUnderManagement))
            {
                return BadRequest(new
                {
                    message = "Chi tiết bảng quảng cáo không thuộc thẩm quyền."
                });
            }

            var res = _mapper.Map<AdsBoardBasicDto>(adsBoard);

            return res;
        }

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
                .Include(s => s.AdsPoint)
                .Include(s => s.AdsCreateRequest)
                .Include(s => s.Reports)
                .ToListAsync();
            
            var result = rawBoards
                .Where(r => Helper.IsUnderAuthority(r.AdsPoint!.Address, acc.UnitUnderManagement))
                .Select(board => board.AdsCreateRequest?.RequestStatus);

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in rawBoards)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }

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

            var rawResult = await _context.AdsPoints.ToListAsync();
            rawResult = rawResult.Where(p => Helper.IsUnderAuthority(p.Address, acc.UnitUnderManagement)).ToList();

            var res = new List<UserAdsPointBasicDto>();
            foreach (var item in rawResult)
            {
                var pointDto = _mapper.Map<UserAdsPointBasicDto>(item);
                res.Add(pointDto);
            }

            return res;
        }

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

            if (adsPoint == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy điểm quảng cáo."
                });
            } else if (!Helper.IsUnderAuthority(adsPoint.Address, acc.UnitUnderManagement)) 
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



        [HttpPost("ads-modification/point")] // , AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)
        public async Task<ActionResult<PointModifyDto>> PointModify(PointModifyDto PointModifyRequest)
        {
            var result = _mapper.Map<PointModify>(PointModifyRequest);


            result.AdsPointId = result.Id;
            result.Id = 0;
            result.ModifyTime = DateTime.Now;
            if (result.Images != null)
            {
                foreach (var item in result.Images)
                {
                    item.AdsPointId = PointModifyRequest.Id;
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

            Console.WriteLine(result.AdsPointId);

            _context.PointModifies.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Tạo yêu cầu chỉnh sửa điểm quảng cáo thành công"
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
