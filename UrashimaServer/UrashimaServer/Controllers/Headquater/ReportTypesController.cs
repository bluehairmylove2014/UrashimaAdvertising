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
    public class ReportTypesController : ControllerBase
    {
        private readonly DataContext _context;

        public ReportTypesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ReportTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportType>>> GetReportTypes()
        {
          if (_context.ReportTypes == null)
          {
              return NotFound();
          }
            return await _context.ReportTypes.ToListAsync();
        }

        // PUT: api/ReportTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReportType(int id, ReportType reportType)
        {
            if (id != reportType.Id)
            {
                return BadRequest();
            }

            _context.Entry(reportType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportTypeExists(id))
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

        // POST: api/ReportTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReportType>> PostReportType(ReportType reportType)
        {
          if (_context.ReportTypes == null)
          {
              return Problem("Entity set 'DataContext.ReportTypes'  is null.");
          }
            _context.ReportTypes.Add(reportType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReportType", new { id = reportType.Id }, reportType);
        }

        // DELETE: api/ReportTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportType(int id)
        {
            if (_context.ReportTypes == null)
            {
                return NotFound();
            }
            var reportType = await _context.ReportTypes.FindAsync(id);
            if (reportType == null)
            {
                return NotFound();
            }

            _context.ReportTypes.Remove(reportType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReportTypeExists(int id)
        {
            return (_context.ReportTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
