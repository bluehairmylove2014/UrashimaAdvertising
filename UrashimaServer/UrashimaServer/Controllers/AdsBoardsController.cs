using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
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

        // POST: api/ads-board
        [HttpPut]
        public async Task<ActionResult<AdsBoardBasicDto>> PutAdsBoard(AdsBoardBasicDto adsBoard)
        {
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsBoards.Update(_mapper.Map<AdsBoard>(adsBoard));

            try
            {
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

        // DELETE: api/ads-board?id=5
        [HttpDelete]
        public async Task<IActionResult> DeleteAdsBoard([FromQuery] int id)
        {
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
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
