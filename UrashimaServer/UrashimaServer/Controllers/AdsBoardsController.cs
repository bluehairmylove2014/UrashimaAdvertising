using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/ads-board/detail
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

        // GET: api/AdsBoards
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

            var result = rawBoards.Select(board => board.AdsCreateRequest?.RequestStatus != "Unconfirmed");

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in rawBoards)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }
    }
}
