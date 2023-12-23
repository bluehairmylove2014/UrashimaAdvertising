using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/reports")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ReportsController(DataContext context, IMapper mapper, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
        }


        // POST: api/report/ads-board
        [HttpPost("ads-board")]
        public async Task<IActionResult> PostReportAdsBoard(PostReportBoardDto rawReport)
        {
            if (_context.Reports == null)
            {
                return Problem("Entity set 'DataContext.Reports' is null.");
            }

            var rep = _mapper.Map<Report>(rawReport);
            rep.AdsBoardId = rawReport.AdsBoardID;
            var point = _context.AdsPoints.Find(rawReport.AdsPointID);
            rep.Address = point != null ? point.Address : "";

            _context.Reports.Add(rep);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "báo cáo bảng quảng cáo thành công"
            });
        }

        //// POST: api/report/ads-point
        //[HttpPost("ads-point")]
        //public async Task<IActionResult> PostReportAdsPoint(PostReportDto rawReport)
        //{
        //    if (_context.Reports == null)
        //    {
        //        return Problem("Entity set 'DataContext.Reports' is null.");
        //    }

        //    var rep = _mapper.Map<Report>(rawReport);
        //    rep.AdsPointId = rawReport.AdsId;
        //    var point = _context.AdsPoints.Find(rawReport.AdsId);
        //    rep.Address = point != null ? point.Address : "";

        //    _context.Reports.Add(rep);

        //    await _context.SaveChangesAsync();

        //    return Ok(new
        //    {
        //        message = "report ads-point successfully"
        //    });
        //}
        
        [HttpPost("location")]
        public async Task<IActionResult> PostReportLocation(PostReportLocationDto rawReport)
        {
            if (_context.Reports == null)
            {
                return Problem("Entity set 'DataContext.Reports' is null.");
            }

            var rep = _mapper.Map<Report>(rawReport);

            var point = _context.AdsPoints
                .Where(point 
                    => point.Longitude == rawReport.Longitude && point.Latitude == rawReport.Latitude)
                .FirstOrDefault();
            
            if (point != null)
            {
                rep.AdsPointId = point.Id;
                rep.Address = point.Address;
            } else
            {
                var controller = new LocationsController(_mapper);
                var geoCode = (await controller.GetRevGeoCodeInfo(rawReport.Latitude, rawReport.Longitude)).Result;
            
                OkObjectResult geoObj = new(new GeoCodeResultDto());
                if (geoCode != null)
                    geoObj = (OkObjectResult)geoCode;

                string address = "Ward 1, District 1";
                if (geoObj.Value != null)
                {
                    foreach (var item in Helper.GetKeyValuePairs(geoObj.Value))
                    {
                        if (item.Key == "Display_name")
                        {
                            address = (string)item.Value;
                            break;
                        }
                    }
                }

                rep.Location = new Location()
                {
                    Longitude = rawReport.Longitude,
                    Latitude = rawReport.Latitude,
                    Address = address,
                };
                rep.Address = address;
            }

            _context.Reports.Add(rep);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "báo cáo vị trí thành công"
            });
        }

        // GET: api/report
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetAllReports()
        {
            var rawResult = await _context.Reports
                .Include(s => s.Images)
                .ToListAsync();

            var result = new List<GetReportDto>();
            foreach (var rawItem in rawResult)
            {
                var getReportDto = _mapper.Map<GetReportDto>(rawItem);
                result.Add(getReportDto);
            }

            return Ok(result);
        }

        [Route("/api/officer/reports")]
        [HttpGet, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IList<GetReportDto>>> GetReportBasedOnRole()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            var rawResult = await _context.Reports
                .Include(r => r.Images)
                .ToListAsync();

            rawResult = rawResult.Where(r => Helper.IsUnderAuthority(r.Address, acc.UnitUnderManagement)).ToList();
            
            var result = new List<GetReportDto>();
            foreach (var rawItem in rawResult)
            {
                var getReportDto = _mapper.Map<GetReportDto>(rawItem);
                result.Add(getReportDto);
            }

            return Ok(result);
        }

        [Route("/api/officer/reports/detail")]
        [HttpGet] // , AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)
        public async Task<ActionResult<GetReportDetailDto>> GetReportDetailBasedOnRole(int id) // GetReportDetailDto
        {
            //var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            //if (acc is null)
            //{
            //    return BadRequest(new
            //    {
            //        Message = "Something went wrong with your account. Please login again!",
            //    });
            //}

            var rawResult = await _context.Reports.Where(r => r.Id == id)
                .Include(r => r.AdsBoard)
                .Include(r => r.AdsPoint)
                .Include(r => r.Location)
                .FirstOrDefaultAsync();

            //if (rawResult is null || !Helper.IsUnderAuthority(rawResult.Address, acc.UnitUnderManagement))
            //{
            //    return NotFound();
            //}

            return Ok(_mapper.Map<GetReportDetailDto>(rawResult));
        }

        [Route("/api/officer/reports")]
        [HttpPut, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<GetReportDto>> UpdateReportBasedOnRole(GetReportDto updateReport)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập lại để tiếp tục",
                });
            }

            var rawResult = await _context.Reports
                .Include(r => r.Images)
                .ToListAsync();

            var updatedItem = rawResult.FirstOrDefault(r => Helper.IsUnderAuthority(r.Address, acc.UnitUnderManagement) && r.Id == updateReport.Id);

            if (updatedItem is null)
            {
                return BadRequest(new
                {
                    Message = "không có báo cáo"
                });
            }

            updatedItem.TreatmentProcess = updateReport.TreatmentProcess;
            updatedItem.ReportStatus = updateReport.ReportStatus;
            await _context.SaveChangesAsync();

            // Setup mail
            MailRequest mailRequest = new MailRequest();
            mailRequest.ToEmail = updatedItem.Email;
            mailRequest.Subject = "Báo cáo đang xử lí!!!";
            mailRequest.Body = $"Thân chào {acc.FullName}, We are writing to inform you that your report is currently being processed. Our team is working hard to ensure that your order is handled as soon as possible.\r\n\r\nReport status: {updatedItem.ReportStatus}, Treatment: {updatedItem.TreatmentProcess}\r\n\r\n. If you have any questions or concerns about your report, please don't hesitate to contact us. We're always here to help.\r\n\r\nThank you for reporting the problem to us.\r\n\r\nBest regards,\r\n\r\nUrashima Map";
            try
            {
                await _emailService.SendEmailAsync(mailRequest);
            } catch
            {
                return BadRequest(new
                {
                    Message = "Không thể gửi email"
                });
            }

            return Ok(_mapper.Map<GetReportDto>(updatedItem));
        }


        private bool ReportExists(int id)
        {
            return (_context.Reports?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
