using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Headquater
{
    /// <summary>
    /// Controller quản lý các phân loại của Headquarter.
    /// </summary>
    [Route("api")]
    [ApiController]
    public class TypeManageController : ControllerBase
    {
        private readonly DataContext _context;

        public TypeManageController(DataContext context)
        {
            _context = context;
        }

        #region ADS_TYPES
        /// <summary>
        /// API Headquarter lấy danh sách các loại Quảng cáo.
        /// </summary>
        // GET: api/ads-type
        [HttpGet("ads-type")]
        public async Task<ActionResult<IEnumerable<AdsType>>> GetAdsTypes()
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsTypes.ToListAsync();
        }
        
        /// <summary>
        /// API Headquarter cập nhật danh sách loại Quảng cáo.
        /// </summary>
        // PUT: api/ads-type
        [HttpPut("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutAdsType([FromBody, Required] ICollection<AdsType> adsType)
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            foreach (var item in _context.AdsTypes)
            {
                _context.AdsTypes.Remove(item);
            }
            _context.AdsTypes.AddRange(adsType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật loại hình quảng cáo"
                });
            }

            return Ok(adsType);
        }

        #endregion

        #region REPORT_TYPES
        /// <summary>
        /// API Headquarter lấy danh sách các loại báo cáo.
        /// </summary>
        // GET: api/report-type
        [HttpGet("report-type")]
        public async Task<ActionResult<IEnumerable<ReportType>>> GetReportTypes()
        {
            if (_context.ReportTypes == null)
            {
                return NotFound();
            }
            return await _context.ReportTypes.ToListAsync();
        }

        /// <summary>
        /// API Headquarter cập nhật danh sách các loại báo cáo.
        /// </summary>
        // PUT: api/report-type
        [HttpPut("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutReportType([FromBody, Required] ICollection<ReportType> reportType)
        {
            if (_context.ReportTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            foreach (var item in _context.ReportTypes)
            {
                _context.ReportTypes.Remove(item);
            }
            _context.ReportTypes.AddRange(reportType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật loại báo cáo"
                });
            }

            return Ok(reportType);
        }

        #endregion

        #region LOCATION_TYPES
        /// <summary>
        /// API Headquarter lấy danh sách các loại địa điểm quảng cáo.
        /// </summary>
        // GET: api/location-type
        [HttpGet("location-type")]
        public async Task<ActionResult<IEnumerable<LocationType>>> GetLocationTypes()
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.LocationTypes.ToListAsync();
        }

        /// <summary>
        /// API Headquarter cập nhật danh sách các loại địa điểm quảng cáo.
        /// </summary>
        // PUT: api/location-type
        [HttpPut("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutLocationType([FromBody, Required] ICollection<LocationType> locateType)
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            foreach (var item in _context.LocationTypes)
            {
                _context.LocationTypes.Remove(item);
            }
            _context.LocationTypes.AddRange(locateType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật loại địa điểm"
                });
            }

            return Ok(locateType);
        }
        #endregion

        #region ADS_FORM_TYPES
        /// <summary>
        /// API Headquarter lấy danh sách các loại hình thức Quảng cáo.
        /// </summary>
        // GET: api/ads-form-type
        [HttpGet("ads-form-type")]
        public async Task<ActionResult<IEnumerable<AdsFormType>>> GetAdsFormTypes()
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsFormTypes.ToListAsync();
        }

        /// <summary>
        /// API Headquarter cập nhật danh sách các loại hình thức Quảng cáo.
        /// </summary>
        // PUT: api/ads-form-type
        [HttpPut("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutAdsFormType([FromBody, Required] ICollection<AdsFormType> adsFormType)
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            foreach (var item in _context.AdsFormTypes)
            {
                _context.AdsFormTypes.Remove(item);
            }
            _context.AdsFormTypes.AddRange(adsFormType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật hình thức quảng cáo"
                });
            }

            return Ok(adsFormType);
        }

        #endregion
    }
}
