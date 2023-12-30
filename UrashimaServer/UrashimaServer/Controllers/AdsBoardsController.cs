using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/ads-board")]
    [ApiController]
    public class AdsBoardsController : ControllerBase
    {
        private readonly DataContext _context;
        readonly IMapper _mapper;

        public AdsBoardsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ads-board
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdsBoard>>> GetAdsBoards()
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            var rawBoards = await _context.AdsBoards
                .Include(s => s.AdsPoint)
                .Include(s => s.AdsCreateRequest)
                .Include(s => s.Reports)
                .ToListAsync();

            var result = rawBoards.Where(board 
                => board.AdsCreateRequest == null || 
                board.AdsCreateRequest.RequestStatus == RequestConstant.Accepted);

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in result)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }

        // GET: api/ads-board/detail?id=5
        [HttpGet("detail")]
        public async Task<ActionResult<AdsBoardBasicDto>> GetAdsBoardDetail([FromQuery] int id)
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            var adsBoard = await _context.AdsBoards.FindAsync(id);

            if (adsBoard == null)
            {
                return NotFound();
            }

            var res = _mapper.Map<AdsBoardBasicDto>(adsBoard);

            return res;
        }

        // -----------------------------------

        // POST: api/ads-board
        [HttpPost]
        public async Task<ActionResult<AdsBoardBasicDto>> PostAdsBoard(AdsBoardBasicDto adsBoard)
        {
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsBoards.Add(_mapper.Map<AdsBoard>(adsBoard));

            try
            {
                await _context.SaveChangesAsync();
            } catch
            {
                return BadRequest(new
                {
                    Message = "Tạo bảng quảng cáo không thành công, vui lòng thử lại"
                });
            }

            return CreatedAtAction("GetAdsBoardDetail", new { id = adsBoard.Id }, adsBoard);
        }

        // Head quater
        [HttpGet("/api/headquater/ads-board"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsBoard>>> GetAdsBoardsHeadQuater()
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

            var region = HttpContext.Items["address"] as string;
            var result = rawBoards.Where(r => Helper.IsUnderAuthority(r.AdsPoint!.Address, acc.UnitUnderManagement, region));

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in result)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }

        // Head quater
        [HttpGet("/api/headquater/ads-board/detail"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsBoardBasicDto>> GetAdsBoardDetailHeadQuater([FromQuery] int id)
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
                .Where(b => b.Id ==  id)
                .Include(b => b.AdsPoint)
                .FirstOrDefaultAsync();

            if (adsBoard == null)
            {
                return NotFound();
            }

            var region = HttpContext.Items["address"] as string;
            if (!Helper.IsUnderAuthority(adsBoard.AdsPoint!.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    Message = "Bảng quảng cáo không nằm trong khu vực bạn quản lí",
                });
            }

            var res = _mapper.Map<AdsBoardBasicDto>(adsBoard);

            return res;
        }

        // -----------------------------------

        // Head quater
        [HttpPost("/api/headquater/ads-board"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsBoardBasicDto>> PostAdsBoardHeadQuater(AdsBoardBasicDto adsBoard)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            if (acc == null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục"
                });
            }

            var point = await _context.AdsPoints
                .Where(b => b.Id == adsBoard.AdsPointId)
                .FirstOrDefaultAsync();

            if (point == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy điểm quảng cáo của bảng quảng cáo này"
                });
            }

            var region = HttpContext.Items["address"] as string;
            if (!Helper.IsUnderAuthority(point!.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    Message = "Bảng quảng cáo không nằm trong khu vực bạn quản lí"
                });
            }

            _context.AdsBoards.Add(_mapper.Map<AdsBoard>(adsBoard));

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Tạo bảng quảng cáo không thành công, vui lòng thử lại"
                });
            }

            return CreatedAtAction("GetAdsBoardDetail", new { id = adsBoard.Id }, adsBoard);
        }

        // Head quater
        [HttpPut("/api/headquater/ads-board"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsBoardBasicDto>> PutAdsBoard(AdsBoardBasicDto adsBoard)
        {
            //var cookie = Request.Cookies;
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            if (acc == null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục"
                });
            }

            var point = await _context.AdsPoints
                .Where(b => b.Id == adsBoard.AdsPointId)
                .FirstOrDefaultAsync();

            if (point == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy điểm quảng cáo của bảng quảng cáo này"
                });
            }

            var region = HttpContext.Items["address"] as string;
            if (!Helper.IsUnderAuthority(point!.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    Message = "Bảng quảng cáo không nằm trong khu vực bạn quản lí"
                });
            }

            try
            {
                _context.AdsBoards.Update(_mapper.Map<AdsBoard>(adsBoard));
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật bảng quảng cáo"
                });
            }

            return Ok(adsBoard);
        }

        // Head quater
        [HttpDelete("/api/headquater/ads-board"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteAdsBoard([FromQuery] int id)
        {
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc == null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục"
                });
            }

            var board = await _context.AdsBoards.FirstOrDefaultAsync(board => board.Id == id);

            if (board == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy bảng quảng cáo"
                });
            }

            var point = await _context.AdsPoints
                .Where(b => b.Id == board.AdsPointId)
                .FirstOrDefaultAsync();

            if (point == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy điểm quảng cáo của bảng quảng cáo này"
                });
            }

            var region = HttpContext.Items["address"] as string;
            if (!Helper.IsUnderAuthority(point!.Address, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    Message = "Bảng quảng cáo không nằm trong khu vực bạn quản lí"
                });
            }

            var adsBoard = await _context.AdsBoards.FindAsync(id);
            if (adsBoard == null)
            {
                return NotFound();
            }

            _context.AdsBoards.Remove(adsBoard);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
