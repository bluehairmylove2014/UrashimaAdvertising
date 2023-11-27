using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdsBoardsController : ControllerBase
    {
        private readonly DataContext _context;

        public AdsBoardsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/AdsBoards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdsBoard>>> GetAdsBoards()
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            return await _context.AdsBoards.Include(s => s.AdsPoint).ToListAsync();
        }

        // GET: api/AdsBoards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdsBoard>> GetAdsBoard(int id)
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

            return adsBoard;
        }

        // PUT: api/AdsBoards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdsBoard(int id, AdsBoard adsBoard)
        {
            if (id != adsBoard.Id)
            {
                return BadRequest();
            }

            _context.Entry(adsBoard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdsBoardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AdsBoards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdsBoard>> PostAdsBoard(AdsBoard adsBoard)
        {
          if (_context.AdsBoards == null)
          {
              return Problem("Entity set 'DataContext.AdsBoards'  is null.");
          }
            _context.AdsBoards.Add(adsBoard);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AdsBoardExists(adsBoard.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAdsBoard", new { id = adsBoard.Id }, adsBoard);
        }

        // DELETE: api/AdsBoards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdsBoard(int id)
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

            _context.AdsBoards.Remove(adsBoard);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdsBoardExists(int id)
        {
            return (_context.AdsBoards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
