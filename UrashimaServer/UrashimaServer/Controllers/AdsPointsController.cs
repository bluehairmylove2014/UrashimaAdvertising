using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller quản lý điểm quảng cáo.
    /// </summary>
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

        /// <summary>
        /// API Guest lấy danh sách các điểm quảng cáo.
        /// </summary>
        // GET: api/ads-points
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAdsPointBasicDto>>> GetAllAdsPoints()
        {
            var rawResult = await _context.AdsPoints.ToListAsync();
            var result = rawResult.Where(point => point.Planned);

            var res = new List<UserAdsPointBasicDto>();
            foreach (var item in result)
            {
                var pointDto = _mapper.Map<UserAdsPointBasicDto>(item);
                pointDto.IsEmpty = !(_context.AdsBoards.Where(b => b.AdsPointId == pointDto.Id).ToList().Count > 0);
                res.Add(pointDto);
            }

            return res;
        }

        /// <summary>
        /// API Guest lấy chi tiết điểm quảng cáo bằng id.
        /// </summary>
        // GET: api/ads-points/detail?id=5
        [HttpGet("detail")]
        public async Task<ActionResult<UserAdsPointDetailDto>> GetAdsPoint([FromQuery, Required] int id)
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

        private bool AdsPointExists(int id)
        {
           return (_context.AdsPoints?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
