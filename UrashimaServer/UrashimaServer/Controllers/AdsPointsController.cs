using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
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
                .Where(point => point.AdsCreateRequest == null || 
                point.AdsCreateRequest.RequestStatus == RequestConstant.Accepted);

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
        [HttpPut, AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsPoint>> PutAdsPoint(PostAdsPointDto adsPoint)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);
            if (_context.AdsPoints == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            if (acc == null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục"
                });
            }

            var currentPoint = await _context.AdsPoints.FindAsync(adsPoint.Id);

            if (currentPoint == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy điểm quảng cáo để cập nhật"
                });
            }

            if (!Helper.IsUnderAuthority(currentPoint.Address, acc.UnitUnderManagement))
            {
                return BadRequest(new
                {
                    Message = "Điểm quảng cáo không nằm trong khu vực bạn quản lí"
                });
            }

            currentPoint = _mapper.Map<AdsPoint>(adsPoint);

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
        [HttpDelete, AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteAdsPoint([FromQuery] int id)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);
            if (_context.AdsPoints == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            if (acc == null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục"
                });
            }

            var currentPoint = await _context.AdsPoints.FindAsync(id);

            if (currentPoint == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy điểm quảng cáo để xóa"
                });
            }

            if (!Helper.IsUnderAuthority(currentPoint.Address, acc.UnitUnderManagement))
            {
                return BadRequest(new
                {
                    Message = "Điểm quảng cáo không nằm trong khu vực bạn quản lí"
                });
            }

            if (currentPoint == null)
            {
                return NotFound();
            }

            _context.AdsPoints.Remove(currentPoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdsPointExists(int id)
        {
           return (_context.AdsPoints?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
