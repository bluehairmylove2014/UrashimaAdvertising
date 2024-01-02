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

        // GET: api/AdsTypes
        [HttpGet("ads-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsType>>> GetAdsTypes()
        {
            if (_context.AdsTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsTypes.ToListAsync();
        }

        // GET: api/AdsTypes
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

        // PUT: api/AdsTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/AdsTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // DELETE: api/AdsTypes/5
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

        // GET: api/ReportTypes
        [HttpGet("report-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<ReportType>>> GetReportTypes()
        {
            if (_context.ReportTypes == null)
            {
                return NotFound();
            }
            return await _context.ReportTypes.ToListAsync();
        }

        // GET: api/AdsTypes
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
                    Message = "Không thể tìm thấy loại hình quảng cáo"
                });
            }
            return Ok(reportType);
        }

        // PUT: api/ReportTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
                    Message = "Không thể cập nhật"
                });
            }

            return Ok(reportType);
        }

        // POST: api/ReportTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // DELETE: api/ReportTypes/5
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

        #region LOCATION_TYPES
        // GET: api/AdsTypes
        [HttpGet("location-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<LocationType>>> GetLocationTypes()
        {
            if (_context.LocationTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.LocationTypes.ToListAsync();
        }

        #endregion

        #region ADS_FORM_TYPES
        // GET: api/AdsTypes
        [HttpGet("ads-form-type"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<AdsFormType>>> GetAdsFormTypes()
        {
            if (_context.AdsFormTypes == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            return await _context.AdsFormTypes.ToListAsync();
        }

        #endregion
    }
}
