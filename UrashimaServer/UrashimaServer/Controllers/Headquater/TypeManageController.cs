using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Headquater
{
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
        // GET: api/ads-type
        [HttpGet("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsType>>> GetAdsTypes()
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsTypes.ToListAsync();
        }

        // GET: api/ads-type/detail
        [HttpGet("ads-type/detail"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsType>> GetAdsTypeDetail(int id)
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var adType = await _context.AdsTypes.FindAsync(id);

            if (adType == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy loại hình quảng cáo"
                });
            }
            return Ok(adType);
        }

        // PUT: api/ads-type
        [HttpPut("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutAdsType(AdsType adsType)
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            _context.AdsTypes.Update(adsType);

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

        // POST: api/ads-type
        [HttpPost("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsType>> PostAdsType(AdsType adsType)
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsTypes.Add(adsType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdsTypeDetail", new { id = adsType.Id }, adsType);
        }

        // DELETE: api/ads-type
        [HttpDelete("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteAdsType([FromQuery] int id)
        {
            if (_context.AdsTypes == null)
            {
                return NotFound();
            }
            var adsType = await _context.AdsTypes.FindAsync(id);
            if (adsType == null)
            {
                return NotFound();
            }

            _context.AdsTypes.Remove(adsType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region REPORT_TYPES
        // GET: api/report-type
        [HttpGet("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<ReportType>>> GetReportTypes()
        {
            if (_context.ReportTypes == null)
            {
                return NotFound();
            }
            return await _context.ReportTypes.ToListAsync();
        }

        // GET: api/report-type/detail
        [HttpGet("report-type/detail"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsType>> GetReportTypesDetail(int id)
        {
            if (_context.ReportTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var reportType = await _context.ReportTypes.FindAsync(id);

            if (reportType == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy loại báo cáo"
                });
            }
            return Ok(reportType);
        }

        // PUT: api/report-type
        [HttpPut("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutReportType(ReportType reportType)
        {
            if (_context.ReportTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.ReportTypes.Update(reportType);

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

        // POST: api/report-type
        [HttpPost("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<ReportType>> PostReportType(ReportType reportType)
        {
            if (_context.ReportTypes == null)
            {
                return Problem("Entity set 'DataContext.ReportTypes'  is null.");
            }
            _context.ReportTypes.Add(reportType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReportTypesDetail", new { id = reportType.Id }, reportType);
        }

        // DELETE: api/report-type
        [HttpDelete("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteReportType([FromQuery] int id)
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
        #endregion

        #region LOCATION_TYPES
        // GET: api/location-type
        [HttpGet("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<LocationType>>> GetLocationTypes()
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.LocationTypes.ToListAsync();
        }

        // GET: api/location-type/detail
        [HttpGet("location-type/detail"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<LocationType>> GetLocationTypeDetail(int id)
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var locateType = await _context.LocationTypes.FindAsync(id);

            if (locateType == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy loại địa điểm"
                });
            }
            return Ok(locateType);
        }

        // PUT: api/location-type
        [HttpPut("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutLocationType(LocationType locateType)
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            _context.LocationTypes.Update(locateType);

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

        // POST: api/location-type
        [HttpPost("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<LocationType>> PostLocateType(LocationType locateType)
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.LocationTypes.Add(locateType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocationTypeDetail", new { id = locateType.Id }, locateType);
        }

        // DELETE: api/location-type
        [HttpDelete("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteLocateType([FromQuery] int id)
        {
            if (_context.LocationTypes == null)
            {
                return NotFound();
            }
            var locateType = await _context.LocationTypes.FindAsync(id);
            if (locateType == null)
            {
                return NotFound();
            }

            _context.LocationTypes.Remove(locateType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region ADS_FORM_TYPES
        // GET: api/ads-form-type
        [HttpGet("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsFormType>>> GetAdsFormTypes()
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsFormTypes.ToListAsync();
        }

        // GET: api/ads-form-type/detail
        [HttpGet("ads-form-type/detail"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsFormType>> GetAdsFormTypeDetail(int id)
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            var adFormType = await _context.AdsFormTypes.FindAsync(id);

            if (adFormType == null)
            {
                return BadRequest(new
                {
                    Message = "Không thể tìm thấy hình thức quảng cáo"
                });
            }
            return Ok(adFormType);
        }

        // PUT: api/ads-form-type
        [HttpPut("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutAdsFormType(AdsFormType adsFormType)
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }

            _context.AdsFormTypes.Update(adsFormType);

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

        // POST: api/ads-form-type
        [HttpPost("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<AdsFormType>> PostAdsFormType(AdsFormType adsFormType)
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsFormTypes.Add(adsFormType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdsFormTypeDetail", new { id = adsFormType.Id }, adsFormType);
        }

        // DELETE: api/ads-form-type
        [HttpDelete("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> DeleteAdsFormType([FromQuery] int id)
        {
            if (_context.AdsFormTypes == null)
            {
                return NotFound();
            }
            var adsFormType = await _context.AdsFormTypes.FindAsync(id);
            if (adsFormType == null)
            {
                return NotFound();
            }

            _context.AdsFormTypes.Remove(adsFormType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion
    }
}
