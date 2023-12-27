using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        // GET: api/headquater/ads-modification
        [HttpGet("ads-modification")]
        public async Task<ActionResult<IEnumerable<PointModifyDto>>> GetAllAdsModification()
        {
            if (_context.PointModifies == null)
            {
                return NotFound();
            }

            var rawResult = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .ToListAsync();

            var res = new List<PointModifyDto>();
            foreach (var item in rawResult)
            {
                res.Add(_mapper.Map<PointModifyDto>(item));
            }

            return res;
        }

        // POST: api/headquater/ads-modification/approve
        [HttpPost("ads-modification/approve")]
        public async Task<IActionResult> ApproveAdsRequest([FromQuery, Required] int id)
        {
            var modifyData = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            // Point
            var pointToModify = await _context.AdsPoints.FindAsync(id);
            if (pointToModify != null)
            {
                var tempPointData = _mapper.Map<UserAdsPointBasicDto>(modifyData);
                _mapper.Map<UserAdsPointBasicDto, AdsPoint>(tempPointData, pointToModify);
            }
            // Chỉ save data trên bảng AdsPoint, không liên quan các bảng khác.

            // await _context.SaveChangesAsync();

            // Image

            // AdsBoard





            return Ok(pointToModify);
        }
    }
}
