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

       

        // PUT: api/AdsBoards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutAdsBoard(int id, AdsBoard adsBoard)
        //{
        //    if (id != adsBoard.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(adsBoard).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AdsBoardExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/AdsBoards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<AdsBoard>> PostAdsBoard(AdsBoard adsBoard)
        //{
        //  if (_context.AdsBoards == null)
        //  {
        //      return Problem("Entity set 'DataContext.AdsBoards'  is null.");
        //  }
        //    _context.AdsBoards.Add(adsBoard);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (AdsBoardExists(adsBoard.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetAdsBoard", new { id = adsBoard.Id }, adsBoard);
        //}

        // DELETE: api/AdsBoards/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteAdsBoard(int id)
        //{
        //    if (_context.AdsBoards == null)
        //    {
        //        return NotFound();
        //    }
        //    var adsBoard = await _context.AdsBoards.FindAsync(id);
        //    if (adsBoard == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.AdsBoards.Remove(adsBoard);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool AdsBoardExists(int id)
        //{
        //    return (_context.AdsBoards?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
