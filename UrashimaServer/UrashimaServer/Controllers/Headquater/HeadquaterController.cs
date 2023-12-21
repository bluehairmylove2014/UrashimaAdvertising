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
    public class HeadquaterController : ControllerBase
    {
        private readonly DataContext _context;

        public HeadquaterController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Headquater
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WardDistrict>>> GetWardDistricts()
        {
          if (_context.WardDistricts == null)
          {
              return NotFound();
          }
            return await _context.WardDistricts.ToListAsync();
        }

        // GET: api/Headquater/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WardDistrict>> GetWardDistrict(int id)
        {
          if (_context.WardDistricts == null)
          {
              return NotFound();
          }
            var wardDistrict = await _context.WardDistricts.FindAsync(id);

            if (wardDistrict == null)
            {
                return NotFound();
            }

            return wardDistrict;
        }

        // PUT: api/Headquater/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWardDistrict(int id, WardDistrict wardDistrict)
        {
            if (id != wardDistrict.Id)
            {
                return BadRequest();
            }

            _context.Entry(wardDistrict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WardDistrictExists(id))
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

        // POST: api/Headquater
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WardDistrict>> PostWardDistrict(WardDistrict wardDistrict)
        {
          if (_context.WardDistricts == null)
          {
              return Problem("Entity set 'DataContext.WardDistricts'  is null.");
          }
            _context.WardDistricts.Add(wardDistrict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWardDistrict", new { id = wardDistrict.Id }, wardDistrict);
        }

        // DELETE: api/Headquater/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWardDistrict(int id)
        {
            if (_context.WardDistricts == null)
            {
                return NotFound();
            }
            var wardDistrict = await _context.WardDistricts.FindAsync(id);
            if (wardDistrict == null)
            {
                return NotFound();
            }

            _context.WardDistricts.Remove(wardDistrict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WardDistrictExists(int id)
        {
            return (_context.WardDistricts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
