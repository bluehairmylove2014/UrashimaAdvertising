using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Controllers.Headquater
{
    [Route("api/headquater")]
    [ApiController]
    public class HeadquaterController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public HeadquaterController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/headquater/ward-district
        [HttpGet("ward-district")]
        public async Task<ActionResult<IEnumerable<WardDistrict>>> GetWardDistricts()
        {
          if (_context.WardDistricts == null)
          {
              return NotFound();
          }
            return await _context.WardDistricts.ToListAsync();
        }

        // POST: api/headquater/ward-district
        [HttpPost("ward-district")]
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

        // POST: api/headquater/request/approve
        [HttpPost("request/approve")]
        public async Task<ActionResult<WardDistrict>> ApproveAdsRequest()
        {
            await Task.Delay(100);



            return Ok(new
            {
                message = "Phê duyệt thành công."
            });
        }
    }
}
