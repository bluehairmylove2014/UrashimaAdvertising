using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Controllers.Headquater
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdsTypesController : ControllerBase
    {
        private readonly DataContext _context;

        public AdsTypesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/AdsTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdsType>>> GetAdsTypes()
        {
          if (_context.AdsTypes == null)
          {
              return NotFound();
          }
            return await _context.AdsTypes.ToListAsync();
        }

        // PUT: api/AdsTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdsType(int id, AdsType adsType)
        {
            if (id != adsType.Id)
            {
                return BadRequest();
            }

            _context.Entry(adsType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdsTypeExists(id))
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

        // POST: api/AdsTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdsType>> PostAdsType(AdsType adsType)
        {
          if (_context.AdsTypes == null)
          {
              return Problem("Entity set 'DataContext.AdsTypes'  is null.");
          }
            _context.AdsTypes.Add(adsType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdsType", new { id = adsType.Id }, adsType);
        }

        // DELETE: api/AdsTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdsType(int id)
        {
            if (_context.AdsTypes == null)
            {
                return NotFound();
            }
            var adsType = await _context.AdsTypes.FindAsync(id);
            if (adsType == null)
            {
                return NotFound();
            }

            _context.AdsTypes.Remove(adsType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdsTypeExists(int id)
        {
            return (_context.AdsTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
