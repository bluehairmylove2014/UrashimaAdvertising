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

            var region = HttpContext.Items["address"] as string;
            result = rawResult.Where(p =>
            {
                return Helper.IsUnderAuthority(p.Address, acc.UnitUnderManagement, region);
            }).ToList();

            var res = new List<PointModifyDto>();
            foreach (var item in result)
            {
                var dataToAdd = _mapper.Map<PointModifyDto>(item);
                res.Add(dataToAdd);
            }

            return res;
        }

        // POST: api/headquater/ads-modification/approve
        [HttpPost("ads-modification/approve"), Authorize(Roles = GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ApproveAdsRequest([Required] PostApproveAdsModifyRequest isModify)
        {
            var modifyData = await _context.PointModifies
                .Include(p => p.AdsBoard)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == isModify.Id);

            if (modifyData == null)
            {
                return NotFound(new
                {
                    message = "Không thể tìm được yêu cầu thay đổi dựa trên id đã cung cấp."
                });
            }

            if (isModify.Status.Equals(ModifyRequestConstant.Deny))
            {
                _context.BoardModifies.RemoveRange(modifyData.AdsBoard!);
                _context.PointModifyImages.RemoveRange(modifyData.Images!);
                _context.PointModifies.Remove(modifyData);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = $"Từ chối thay đổi của yêu cầu id={modifyData.Id} thành công."
                });
            } else if (!isModify.Status.Equals(ModifyRequestConstant.Approve))
            {
                return BadRequest(new
                {
                    message = $"Trạng thái thay đổi:\'{isModify.Status}\' không hỗ trợ."
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

        // POST: api/headquater/ads-request/status
        [HttpPost("ads-request/status"), Authorize(Roles = GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ChangeAdsCreateRequestStatus([Required] PostApproveAdsModifyRequest isCreated)
        {
            var createRequest = await _context.AdsCreationRequests.FindAsync(isCreated.Id);
            if (createRequest == null)
            {
                return NotFound(new
                {
                    message = "Không thể tìm được yêu cầu tạo mới dựa trên id đã cung cấp."
                });
            }

            if (isCreated.Status.Equals(RequestConstant.Rejected))
            {
                var boardToRemove = _context.AdsBoards.Where(board => board.AdsCreateRequestId == createRequest.Id);
                _context.AdsBoards.RemoveRange(boardToRemove);
                _context.AdsCreationRequests.Remove(createRequest);
            } else
            {
                createRequest.RequestStatus = isCreated.Status;
            }
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Thay đổi trạng thái của yêu cầu id={isCreated.Id} thành công."
            });
        }

        // PUT: api/headquater/ads-point
        [HttpPut("ads-point"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> UpdateAdsPointWithBoard(UserAdsPointDetailDto updatedPoint)
        {
            if (updatedPoint == null)
            {
                return BadRequest(new
                {
                    message = "Dữ liệu cung cấp không đầy đủ."
                });
            }

            // Point
            var pointToModify = await _context.AdsPoints.FindAsync(updatedPoint.Id);
            if (pointToModify != null)
            {
                var tempPointData = _mapper.Map<UserAdsPointBasicDto>(updatedPoint);
                _mapper.Map<UserAdsPointBasicDto, AdsPoint>(tempPointData, pointToModify);

                await _context.SaveChangesAsync();
            }
            // Chỉ save data trên bảng AdsPoint, không liên quan các bảng khác.

            // AdsBoard
            if (updatedPoint.AdsBoard != null)
            {
                var boardData = new List<AdsBoard>();
                var updatedBoardIds = new List<int>();

                foreach (var item in updatedPoint.AdsBoard)
                {
                    var boardToModify = _context.AdsBoards.Find(item.Id);
                    if (boardToModify != null)
                    {
                        _mapper.Map<GetPointAdsBoardDto, AdsBoard>(item, boardToModify);
                        updatedBoardIds.Add(boardToModify.Id);
                    }
                    else
                    {
                        boardData.Add(_mapper.Map<AdsBoard>(item));
                    }
                }
                _context.SaveChanges();

                var removedData = _context.AdsBoards
                    .Where(board => board.AdsPointId == updatedPoint.Id && !updatedBoardIds.Contains(board.Id)).ToList();

                _context.AdsBoards.RemoveRange(removedData);
                _context.AdsBoards.AddRange(boardData);

                await _context.SaveChangesAsync();
            }

            // Image
            if (updatedPoint.Images != null)
            {
                var imagesToModify = _context.AdsPointImages
                    .Where(img => img.AdsPointId == updatedPoint.Id).ToList();
                _context.AdsPointImages.RemoveRange(imagesToModify);
                _context.SaveChanges();

                foreach (var item in updatedPoint.Images)
                {
                    _context.AdsPointImages.Add(new AdsPointImage
                    {
                        Image = item.Image,
                        AdsPointId = updatedPoint.Id
                    });
                }
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = $"Áp dụng thay đổi của điểm quảng cáo id={updatedPoint.Id} thành công."
            });
        }

    }
}
