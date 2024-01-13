using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;
using UrashimaServer.RealTime;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller xử lý Report.
    /// </summary>
    [Route("api/reports")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IHubContext<ChatHub, IChatClient> _chatHubContext;

        public ReportsController(DataContext context, IMapper mapper, IEmailService emailService, IHubContext<ChatHub, IChatClient> chatHubContext)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
            _chatHubContext = chatHubContext;
        }

        /// <summary>
        /// API Guest báo cáo bảng quảng cáo.
        /// </summary>
        // POST: api/reports/ads-board
        [HttpPost("ads-board")]
        public async Task<IActionResult> PostReportAdsBoard(PostReportBoardDto rawReport)
        {
            if (_context.Reports == null)
            {
                return Problem("Entity set 'DataContext.Reports' is null.");
            }

            var rep = _mapper.Map<Report>(rawReport);
            rep.AdsBoardId = rawReport.AdsBoardID;
            var point = await _context.AdsPoints.FindAsync(rawReport.AdsPointID);
            rep.Address = point != null ? point.Address : "";
            
            _context.Reports.Add(rep);

            await _context.SaveChangesAsync();

            #region REAL TIME - SEND TO OFFICER
            var accounts = await _context.Accounts
                .ToListAsync();
            accounts = accounts
                    .Where(acc => Helper.IsUnderAuthority(rep.Address, acc.UnitUnderManagement))
                    .ToList();

            var users = await _context.Users
                .Include(u => u.Connections)
                .ToListAsync();

            foreach (var account in accounts)
            {
                foreach (var user in users)
                {
                    if (user.Email.Equals(account.Email))
                    {
                        if (user.Connections != null)
                        {
                            foreach (var connection in user.Connections)
                            {
                                await _chatHubContext.Clients.Client(connection.ConnectionId)
                                    .AddMessage($"Người dân gửi một báo cáo đến khu vực của bạn");
                            }
                        }
                    }
                }
            }
            #endregion

            return Ok(new
            {
                message = "báo cáo bảng quảng cáo thành công"
            });
        }

        /// <summary>
        /// API Guest báo cáo điểm quảng cáo hoặc địa điểm trên bảng đồ.
        /// </summary>
        // POST: api/reports/location
        [HttpPost("location")]
        public async Task<IActionResult> PostReportLocation(PostReportLocationDto rawReport)
        {
            if (_context.Reports == null)
            {
                return Problem("Entity set 'DataContext.Reports' is null.");
            }

            var rep = _mapper.Map<Report>(rawReport);

            var point = await _context.AdsPoints
                .Where(point 
                    => point.Longitude == rawReport.Longitude && point.Latitude == rawReport.Latitude)
                .FirstOrDefaultAsync();
            
            if (point != null)
            {
                rep.AdsPointId = point.Id;
                rep.Address = point.Address;
            } else
            {
                var controller = new LocationsController(_mapper, _context);
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

            #region REAL TIME - SEND TO OFFICER
            var accounts = await _context.Accounts
                .ToListAsync();
            accounts = accounts
                    .Where(acc => Helper.IsUnderAuthority(rep.Address, acc.UnitUnderManagement))
                    .ToList();

            var users = await _context.Users
                .Include(u => u.Connections)
                .ToListAsync();

            foreach (var account in accounts)
            {
                foreach (var user in users)
                {
                    if (user.Email.Equals(account.Email))
                    {
                        if (user.Connections != null)
                        {
                            foreach (var connection in user.Connections)
                            {
                                await _chatHubContext.Clients.Client(connection.ConnectionId)
                                    .AddMessage($"Người dân gửi một báo cáo đến khu vực của bạn");
                            }
                        }
                    }
                }
            }
            #endregion

            return Ok(new
            {
                message = "báo cáo vị trí thành công"
            });
        }

        /// <summary>
        /// API Officer|Headquarter lấy danh sách báo cáo theo đơn vị quản lý.
        /// </summary>
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
                .Include(r => r.Location)
                .Include(r => r.AdsPoint)
                .ToListAsync();

            var region = HttpContext.Items["address"] as string;

            rawResult = rawResult.Where(r => {
                var reportedAddress = r.AdsPoint != null ? r.AdsPoint.Address : r.Location!.Address;
                return Helper.IsUnderAuthority(reportedAddress, acc.UnitUnderManagement, region);
            }).ToList();
            
            var result = new List<GetReportDto>();
            foreach (var rawItem in rawResult)
            {
                var getReportDto = _mapper.Map<GetReportDto>(rawItem);

                if (rawItem.AdsPoint != null)
                {
                    getReportDto.Lat = rawItem.AdsPoint.Latitude;
                    getReportDto.Lon = rawItem.AdsPoint.Longitude;
                } else if (rawItem.Location != null)
                {
                    getReportDto.Lat = rawItem.Location.Latitude;
                    getReportDto.Lon = rawItem.Location.Longitude;
                }

                result.Add(getReportDto);
            }

            return Ok(result);
        }

        /// <summary>
        /// API Officer|Headquarter lấy chi tiết báo cáo theo đơn vị quản lý.
        /// </summary>
        [Route("/api/officer/reports/detail")]
        [HttpGet, AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<GetReportDetailDto>> GetReportDetailBasedOnRole([Required] int id) // GetReportDetailDto
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            var rawResult = await _context.Reports.Where(r => r.Id == id)
                .Include(r => r.AdsBoard)
                .Include(r => r.AdsPoint)
                .Include(r => r.Location)
                .Include(r => r.Images)
                .FirstOrDefaultAsync();

            var region = HttpContext.Items["address"] as string;

            if (rawResult is null)
            {
                return NotFound("Không tìm thấy report dựa trên id đã cung cấp.");
            } else
            {
                var reportedAddress = rawResult.AdsPoint != null ? rawResult.AdsPoint.Address : rawResult.Location!.Address;
                var isUnderAuthority = Helper.IsUnderAuthority(reportedAddress, acc.UnitUnderManagement, region);
                if (!isUnderAuthority)
                    return BadRequest(new
                    {
                        message = "Báo cáo này không thuộc quyền quản lý."
                    });
            }

            var result = _mapper.Map<GetReportDetailDto>(rawResult);
            if (rawResult.AdsPoint != null)
            {
                result.Lat = rawResult.AdsPoint.Latitude;
                result.Lon = rawResult.AdsPoint.Longitude;
            }
            else if (rawResult.Location != null)
            {
                result.Lat = rawResult.Location.Latitude;
                result.Lon = rawResult.Location.Longitude;
            }

            return Ok(result);
        }

        /// <summary>
        /// API Officer cập nhật thông tin xử lý báo cáo theo đơn vị quản lý.
        /// </summary>
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

            var updatedItem = await _context.Reports
                .Include(r => r.Images)
                .Include(r => r.AdsPoint)
                .Include(r => r.Location)
                .FirstOrDefaultAsync(r => r.Id == updateReport.Id);

            var region = HttpContext.Items["address"] as string;
            var reportedAddress = updatedItem!.AdsPoint != null 
                ? updatedItem!.AdsPoint.Address
                : updatedItem!.Location!.Address;

            if (!Helper.IsUnderAuthority(reportedAddress, acc.UnitUnderManagement, region))
            {
                return BadRequest(new
                {
                    Message = "không có báo cáo"
                });
            }

            updatedItem.TreatmentProcess = updateReport.TreatmentProcess;
            updatedItem.ReportStatus = !(string.IsNullOrEmpty(updateReport.TreatmentProcess));

            await _context.SaveChangesAsync();

            // Setup mail
            MailRequest mailRequest = new MailRequest();
            mailRequest.ToEmail = updatedItem.Email;
            mailRequest.Subject = "Báo cáo đang xử lí!!!";
            mailRequest.Body = $"Thân chào {updatedItem.Name}, We are writing to inform you that your report is currently being processed. Our team is working hard to ensure that your order is handled as soon as possible.\r\n\r\nReport status: {updatedItem.ReportStatus}, Treatment: {updatedItem.TreatmentProcess}\r\n\r\n. If you have any questions or concerns about your report, please don't hesitate to contact us. We're always here to help.\r\n\r\nThank you for reporting the problem to us.\r\n\r\nBest regards,\r\n\r\nUrashima Map";
            try
            {
                await _emailService.SendReportEmailAsync(mailRequest);
            } catch
            {
                return BadRequest(new
                {
                    Message = "Không thể gửi email"
                });
            }

            #region REAL TIME - SEND TO OFFICER
            await _chatHubContext.Clients.Group("guests").AddMessage($"Trạng thái báo cáo bạn gửi đã được cập nhật|{updatedItem.SubmissionDate}");
            #endregion

            return Ok(new
            {
                message = "Xử lý báo cáo thành công."
            });
        }


        private bool ReportExists(int id)
        {
            return (_context.Reports?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
