using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ReportsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // POST: api/report/ads-board
        [HttpPost("ads-board")]
        public async Task<IActionResult> PostReportAdsBoard(Report report)
        {
          if (_context.Reports == null)
          {
              return Problem("Entity set 'DataContext.Reports' is null.");
          }
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return Ok(new { 
                id = report.Id,
                message = "ok"
            });
        }

        // POST: api/report/location
        [HttpPost("location")]
        public async Task<IActionResult> PostReportLocation(PostReportLocationDto rawReport)
        {
            if (_context.Reports == null)
            {
                return Problem("Entity set 'DataContext.Reports' is null.");
            }

            var rep = new Report()
            {
                ReportLoc = new ReportLoc()
                {
                    Latitude = rawReport.Latitude,
                    Longitude = rawReport.Longitude,
                },
                ReportType = rawReport.ReportType,
                Name = rawReport.Name,
                Email = rawReport.Email,
                Phone = rawReport.Phone,
                Content = rawReport.Content,
            };

            var newImgs = new List<ReportImage>();
            if (rawReport.Images != null && rawReport.Images.Count > 0) {
                foreach (var item in rawReport.Images)
                {
                    newImgs.Add(new ReportImage()
                    {
                        Image = item.Image,
                    });
                }
                rep.Images = newImgs;
            }

            _context.Reports.Add(rep);


            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "ok"
            });
        }

        // GET: api/report/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Report>>> GetAllReports()
        {
            var rawResult = await _context.Reports
                .Include(s => s.Images)
                .Include(s => s.ReportLoc)
                .ToListAsync();

            return rawResult;
        }


        private bool ReportExists(int id)
        {
            return (_context.Reports?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
