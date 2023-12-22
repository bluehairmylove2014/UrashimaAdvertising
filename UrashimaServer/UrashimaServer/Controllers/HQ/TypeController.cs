using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Controllers.HQ
{
    [Route("api")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly DataContext _context;

        public TypeController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ads-type/all
        [HttpGet("ads-type/all")]
        public async Task<ActionResult<IEnumerable<AdsType>>> GetAdsTypes()
        {
          if (_context.AdsTypes == null)
          {
              return NotFound();
          }
            return await _context.AdsTypes.ToListAsync();
        }

        // GET: api/report-type/all
        [HttpGet("report-type/all")]
        public async Task<ActionResult<IEnumerable<ReportType>>> GetReportTypes()
        {
            if (_context.ReportTypes == null)
            {
                return NotFound();
            }
            return await _context.ReportTypes.ToListAsync();
        }

        [HttpPut("report-type")]
        public async Task<IActionResult> ReplaceReportTypes([FromBody] List<ReportType> reportTypes)
        {
            // Validate incoming data
            if (reportTypes == null || reportTypes.Count == 0)
            {
                return BadRequest("Invalid request body.");
            }

            try
            {
                // Delete all existing records (be cautious about this!)
                _context.ReportTypes.RemoveRange(_context.ReportTypes);

                // Add all received records
                _context.ReportTypes.AddRange(reportTypes);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Response indicating successful replacement
                return Ok("Report types successfully update.");
            }
            catch (Exception ex)
            {
                // Handle errors gracefully and inform about replacement failure
                return StatusCode(500, "Failed to update report types.");
            }
        }

        [HttpPut("ads-type")]
        public async Task<IActionResult> ReplaceAdsTypes([FromBody] List<AdsType> AdsTypes)
        {
            // Validate incoming data
            if (AdsTypes == null || AdsTypes.Count == 0)
            {
                return BadRequest("Invalid request body.");
            }

            try
            {
                // Delete all existing records (be cautious about this!)
                _context.AdsTypes.RemoveRange(_context.AdsTypes);

                // Add all received records
                _context.AdsTypes.AddRange(AdsTypes);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Response indicating successful replacement
                return Ok("Report types successfully update.");
            }
            catch (Exception ex)
            {
                // Handle errors gracefully and inform about replacement failure
                return StatusCode(500, "Failed to update report types.");
            }
        }
    }
}
