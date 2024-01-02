using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
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
        [HttpGet("ward-district"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<WardDistrict>>> GetWardDistricts()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            if (_context.WardDistricts == null)
            {
                return NotFound(new
                {
                    message = "Không thể kết nối đến cơ sở dữ liệu"
                });
            }

            var rawRes = await _context.WardDistricts.ToListAsync();
            if (acc.Role == GlobalConstant.WardOfficer || acc.Role == GlobalConstant.DistrictOfficer)
            {
                // var region = HttpContext.Items["address"] as string;
                var result = rawRes.Where(p => {
                    return Helper.IsUnderAuthority($"{p.Ward}, {p.District}" , acc.UnitUnderManagement);
                }).ToList();

                return result;
            }

            return rawRes;
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
        [HttpGet("ads-modification"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<IEnumerable<PointModifyDto>>> GetAllAdsModification()
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (acc is null)
            {
                return BadRequest(new
                {
                    Message = "Vui lòng đăng nhập để tiếp tục",
                });
            }

            if (_context.PointModifies == null)
            {
                return NotFound(new
                {
                    message = "Không thể kết nối đến cơ sở dữ liệu"
                });
            }

            var rawResult = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .ToListAsync();

            var result = rawResult;
            if (acc.Role == GlobalConstant.WardOfficer || acc.Role == GlobalConstant.DistrictOfficer)
            {
                var region = HttpContext.Items["address"] as string;
                result = rawResult.Where(p =>
                {
                    return Helper.IsUnderAuthority(p.Address, acc.UnitUnderManagement, region);
                }).ToList();
            }

            var res = new List<PointModifyDto>();
            foreach (var item in result)
            {
                res.Add(_mapper.Map<PointModifyDto>(item));
            }

            return res;
        }

        // POST: api/headquater/ads-modification/approve
        [HttpPost("ads-modification/approve"), Authorize(Roles = GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ApproveAdsRequest([FromQuery, Required] int id)
        {
            var modifyData = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (modifyData == null)
            {
                return NotFound(new
                {
                    message = "Không thể tìm được yêu cầu thay đổi dựa trên id đã cung cấp."
                });
            }

            // Point
            var pointToModify = await _context.AdsPoints.FindAsync(modifyData.AdsPointId);
            if (pointToModify != null)
            {
                var tempPointData = _mapper.Map<UserAdsPointBasicDto>(modifyData);
                _mapper.Map<UserAdsPointBasicDto, AdsPoint>(tempPointData, pointToModify);
                pointToModify.Id = modifyData.AdsPointId;

                await _context.SaveChangesAsync();
            }
            // Chỉ save data trên bảng AdsPoint, không liên quan các bảng khác.

            // AdsBoard
            if (modifyData.AdsBoard != null)
            {
                foreach (var item in modifyData.AdsBoard)
                {
                    var boardToModify = await _context.AdsBoards.FindAsync(item.AdsBoardId);
                    var tempBoardData = _mapper.Map<AdsBoardBasicDto>(item);
                    _mapper.Map<AdsBoardBasicDto, AdsBoard>(tempBoardData, boardToModify!);
                    boardToModify!.Id = item.AdsBoardId;
                    boardToModify!.AdsPointId = modifyData.AdsPointId;
                }
                await _context.SaveChangesAsync();
            }

            // Image
            if (modifyData.Images != null)
            {
                var imagesToModify = _context.AdsPointImages
                    .Where(img => img.AdsPointId == modifyData.AdsPointId).ToList();
                _context.AdsPointImages.RemoveRange(imagesToModify);
                _context.SaveChanges();

                foreach (var item in modifyData.Images)
                {
                    _context.AdsPointImages.Add(new AdsPointImage
                    {
                        Image = item.Image,
                        AdsPointId = modifyData.AdsPointId
                    });
                }
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = $"Áp dụng thay đổi của yêu cầu id={modifyData.Id} thành công."
            });
        }

        // POST: api/headquater/ads-modification/status
        [HttpDelete("ads-request/status"), Authorize(Roles = GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ChangeAdsCreateRequestStatus(
            [FromQuery, Required] int id,
            [FromQuery, Required] string status)
        {
            var createRequest = await _context.AdsCreationRequests.FindAsync(id);
            if (createRequest == null)
            {
                return NotFound(new
                {
                    message = "Không thể tìm được yêu cầu tạo mới dựa trên id đã cung cấp."
                });
            }

            createRequest.RequestStatus = status;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Thay đổi trạng thái của yêu cầu id={id} thành công."
            });
        }
    }
}
