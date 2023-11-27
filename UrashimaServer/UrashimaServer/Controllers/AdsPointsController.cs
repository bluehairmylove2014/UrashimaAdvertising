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
    public class AdsPointsController : ControllerBase
    {
        private readonly DataContext _context;

        public AdsPointsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/AdsPoints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdsPoint>>> GetAdsPoints()
        {
            if (_context.AdsPoints == null)
            {
                return NotFound();
            }


            var res = await _context.AdsPoints.Include(s => s.AdsBoards).ToListAsync();

            return res;
        }

        // GET: api/AdsPoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdsPoint>> GetAdsPoint(int id)
        {
          if (_context.AdsPoints == null)
          {
              return NotFound();
          }
            var adsPoint = (await _context.AdsPoints
                .Where(adsPoint => adsPoint.Id == id)
                .Include(s => s.AdsBoards)
                .ToListAsync()).FirstOrDefault();

            if (adsPoint == null)
            {
                return NotFound();
            }

            return adsPoint;
        }

        // PUT: api/AdsPoints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdsPoint(int id, AdsPoint adsPoint)
        {
            if (id != adsPoint.Id)
            {
                return BadRequest();
            }

            _context.Entry(adsPoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdsPointExists(id))
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

        // POST: api/AdsPoints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdsPoint>> PostAdsPoint(AdsPoint adsPoint)
        {
          if (_context.AdsPoints == null)
          {
              return Problem("Entity set 'DataContext.AdsPoints'  is null.");
          }
            _context.AdsPoints.Add(adsPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdsPoint", new { id = adsPoint.Id }, adsPoint);
        }

        // DELETE: api/AdsPoints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdsPoint(int id)
        {
            if (_context.AdsPoints == null)
            {
                return NotFound();
            }
            var adsPoint = await _context.AdsPoints.FindAsync(id);
            if (adsPoint == null)
            {
                return NotFound();
            }

            _context.AdsPoints.Remove(adsPoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdsPointExists(int id)
        {
            return (_context.AdsPoints?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
