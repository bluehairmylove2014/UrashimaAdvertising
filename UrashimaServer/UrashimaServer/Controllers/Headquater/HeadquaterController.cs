using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    /// <summary>
    /// Controller quản lý cho vai trò Headquarter.
    /// </summary>
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

        /// <summary>
        /// API lấy đơn vị quản lý của tài khoản.
        /// </summary>
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

        /// <summary>
        /// API thêm mới đơn vị quản lý của thành phố.
        /// </summary>
        // POST: api/headquater/ward-district
        [HttpPost("ward-district"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<WardDistrict>> PostWardDistrict(WardDistrictDto wardDistrict)
        {
            if (_context.WardDistricts == null)
            {
                return NotFound(new
                {
                    message = "Không thể kết nối đến cơ sở dữ liệu"
                });
            }

            _context.WardDistricts.Add(new()
            {
                Ward = wardDistrict.Ward,
                District = wardDistrict.District
            });
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Thêm đơn vị quản lý thành công.",
            }); ;
        }

        /// <summary>
        /// API xóa đơn vị quản lý của thành phố.
        /// </summary>
        // DELETE: api/headquater/ward-district
        [HttpDelete("ward-district"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<WardDistrict>> DeleteWardDistrict([FromQuery, Required] int id)
        {
            if (_context.WardDistricts == null)
            {
                return NotFound(new
                {
                    message = "Không thể kết nối đến cơ sở dữ liệu"
                });
            }

            var item = await _context.WardDistricts.FindAsync(id);
            if (item == null) 
            {
                return NotFound(new
                {
                    message = $"Không tìm thấy đơn vị quản lý id={id}"
                });
            }

            _context.WardDistricts.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Xóa đơn vị quản lý thành công.",
            });
        }

        /// <summary>
        /// API Headquarter danh sách các yêu cầu chỉnh sửa quảng cáo.
        /// </summary>
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
                var address = _context.AdsPoints.Find(p.AdsPointId)!.Address;
                return Helper.IsUnderAuthority(address, acc.UnitUnderManagement, region);
            }).ToList();

            var res = new List<PointModifyDto>();
            foreach (var item in result)
            {
                var dataToAdd = _mapper.Map<PointModifyDto>(item);
                res.Add(dataToAdd);
            }

            return res;
        }

        /// <summary>
        /// API Headquarter chấp thuận/từ chối yêu cầu chỉnh sửa quảng cáo.
        /// </summary>
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

            if (!RequestConstant.Status.Contains(isModify.Status))
            {
                return BadRequest(new
                {
                    message = $"Trạng thái thay đổi:\'{isModify.Status}\' không hỗ trợ."
                });
            } else if (isModify.Status.Equals(RequestConstant.Approve)
                || isModify.Status.Equals(RequestConstant.Accepted))
            {
                // Point
                var pointToModify = await _context.AdsPoints.FindAsync(modifyData.AdsPointId);
                if (pointToModify != null)
                {
                    var tempPointData = _mapper.Map<UserAdsPointBasicDto>(modifyData);
                    _mapper.Map<UserAdsPointBasicDto, AdsPoint>(tempPointData, pointToModify);
                    pointToModify.Id = modifyData.AdsPointId;

                    await _context.SaveChangesAsync();
                }

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
                    await _context.SaveChangesAsync();

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
                modifyData.RequestStatus = RequestConstant.Accepted;
                await _context.SaveChangesAsync();
            }

            if (isModify.Status.Equals(RequestConstant.Deny)
                || isModify.Status.Equals(RequestConstant.Rejected))
            {
                modifyData.RequestStatus = RequestConstant.Rejected;
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = $"Từ chối thay đổi của yêu cầu id={modifyData.Id} thành công."
                });
            }

            return Ok(new
            {
                message = $"Áp dụng thay đổi của yêu cầu id={modifyData.Id} thành công."
            });
        }

        /// <summary>
        /// API Headquarter chấp thuận/từ chối yêu cầu tạo mới quảng cáo.
        /// </summary>
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

            if (!RequestConstant.Status.Contains(isCreated.Status))
            {
                return BadRequest(new
                {
                    message = $"Trạng thái của Request không hợp lệ: '{isCreated.Status}'."
                });
            }
            createRequest.RequestStatus = isCreated.Status;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Thay đổi trạng thái của yêu cầu id={isCreated.Id} thành công."
            });
        }

        /// <summary>
        /// API Headquarter thêm mới điểm quảng cáo.
        /// </summary>
        // POST: api/headquater/ads-point
        [HttpPost("ads-point"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> CreateAdsPointWithBoard(HQPostAdsPointDto createdPoint)
        {
            if (createdPoint == null)
            {
                return BadRequest(new
                {
                    message = "Dữ liệu cung cấp không đầy đủ."
                });
            }

            var addedPoint = _mapper.Map<AdsPoint>(createdPoint);

            var afterAdd = _context.AdsPoints.Add(addedPoint);
            
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Tạo điểm quảng cáo mới thành công với id={afterAdd.Entity.Id}."
            });
        }

        /// <summary>
        /// API Headquarter cập nhật điểm quảng cáo kèm với bảng quảng cáo và hình ảnh điểm quảng cáo.
        /// </summary>
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
            if (pointToModify == null)
            {
                return BadRequest(new
                {
                    message = $"Không thể tìm được điểm quảng cáo có id={updatedPoint.Id}."
                });
            }

            var tempPointData = _mapper.Map<UserAdsPointBasicDto>(updatedPoint);
            _mapper.Map<UserAdsPointBasicDto, AdsPoint>(tempPointData, pointToModify);
            await _context.SaveChangesAsync();
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
                        item.AdsPointId = pointToModify.Id;
                        _mapper.Map<GetPointAdsBoardDto, AdsBoard>(item, boardToModify);
                        updatedBoardIds.Add(boardToModify.Id);
                    }
                    else
                    {
                        item.AdsPointId = pointToModify.Id;
                        boardData.Add(_mapper.Map<AdsBoard>(item));
                    }
                }
                await _context.SaveChangesAsync();

                var removedData = await _context.AdsBoards
                    .Where(board => board.AdsPointId == updatedPoint.Id && !updatedBoardIds.Contains(board.Id)).ToListAsync();

                _context.AdsBoards.RemoveRange(removedData);
                _context.AdsBoards.AddRange(boardData);

                await _context.SaveChangesAsync();
            }

            // Image
            if (updatedPoint.Images != null)
            {
                var imagesToModify = await _context.AdsPointImages
                    .Where(img => img.AdsPointId == updatedPoint.Id).ToListAsync();
                _context.AdsPointImages.RemoveRange(imagesToModify);
                await _context.SaveChangesAsync();

                foreach (var item in updatedPoint.Images)
                {
                    _context.AdsPointImages.Add(new AdsPointImage
                    {
                        Image = item.Image,
                        AdsPointId = pointToModify.Id
                    });
                }
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = $"Áp dụng thay đổi của điểm quảng cáo id={updatedPoint.Id} thành công."
            });
        }

        /// <summary>
        /// API Headquarter xóa điểm quảng cáo.
        /// </summary>
        // DELETE: api/headquater/ads-point
        [HttpDelete("ads-point"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> RemoveAdsPoint([FromQuery, Required] int id)
        {
            var pointToRemove = await _context.AdsPoints.FindAsync(id);
            if (pointToRemove == null)
            {
                return BadRequest(new
                {
                    message = $"Không thể tìm được điểm quảng cáo có id={id}."
                });
            }

            _context.AdsPoints.Remove(pointToRemove);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Xóa điểm quảng cáo id={id} thành công."
            });
        }

    }
}
