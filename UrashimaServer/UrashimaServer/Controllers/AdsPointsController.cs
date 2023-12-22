using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/ads-point")]
    [ApiController]
    public class AdsPointsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AdsPointsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ads-points
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAdsPointBasicDto>>> GetAllAdsPoints()
        {
            var rawResult = await _context.AdsPoints.ToListAsync();
            var result = rawResult
                .Where(point => point.AdsCreateRequest == null || point.AdsCreateRequest.RequestStatus);

            var res = new List<UserAdsPointBasicDto>();
            foreach (var item in rawResult)
            {
                var pointDto = _mapper.Map<UserAdsPointBasicDto>(item);
                res.Add(pointDto);
            }

            

            return res;
        }

        // GET: api/ads-points/detail?id=5
        [HttpGet("detail")]
        public async Task<ActionResult<UserAdsPointDetailDto>> GetAdsPoint([FromQuery] int id)
        {
            if (_context.AdsPoints == null)
            {
                return NotFound();
            }

            var adsPoint = (await _context.AdsPoints
                .Where(adsPoint => adsPoint.Id == id)
                .Include(s => s.AdsBoard)
                .Include(s => s.Images)
                .ToListAsync()).FirstOrDefault();

            if (adsPoint == null)
            {
                return NotFound();
            }

            var res = _mapper.Map<UserAdsPointDetailDto>(adsPoint);

            return res;
        }

        // POST: api/AdsPoints
        [HttpPost]
        public async Task<ActionResult<AdsPoint>> PostAdsPoint(PostAdsPointDto adsPoint)
        {
            if (_context.AdsPoints == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsPoints.Add(_mapper.Map<AdsPoint>(adsPoint));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdsPoint", new { id = adsPoint.Id }, adsPoint);
        }

        // POST: api/AdsPoints
        [HttpPut]
        public async Task<ActionResult<AdsPoint>> PutAdsPoint(PostAdsPointDto adsPoint)
        {
            if (_context.AdsPoints == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsPoints.Update(_mapper.Map<AdsPoint>(adsPoint));

            try
            {
                await _context.SaveChangesAsync();
            } catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật điểm quảng cáo"
                });
            }

            return Ok(adsPoint);
        }

        // DELETE: api/AdsPoints
        [HttpDelete]
        public async Task<IActionResult> DeleteAdsPoint([FromQuery] int id)
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
