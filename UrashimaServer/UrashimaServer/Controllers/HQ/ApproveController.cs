using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.HQ
{
    // this controller still have bug

    [Route("api")]
    [ApiController]
    public class ApproveController : ControllerBase
    {
        private readonly DataContext _context;
        readonly IMapper _mapper;

        public ApproveController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPut("/approve-board")]
        public async Task<IActionResult> ApproveBoard(int id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var modify = await _context.BoardModifies.FindAsync(id);

            var exist = await _context.AdsBoards.FindAsync(modify.Id);

            exist.AdsPointId = modify.AdsPointId;
            exist.AdsType = modify.AdsType;
            exist.Width = modify.Width;
            exist.Height = modify.Height;
            exist.Image = modify.Image;
            exist.ExpiredDate = modify.ExpiredDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật bảng quảng cáo"
                });
            }

            _context.BoardModifies.Remove(modify);
            await _context.SaveChangesAsync();

            return Ok(exist);
        }

        [HttpPut("/approve-point")]
        public async Task<IActionResult> ApprovePoint(int id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var modify = await _context.PointModifies.FindAsync(id);
            var exist = await _context.AdsPoints.FindAsync(modify.Id);

            var map = _mapper.Map<AdsPoint>(modify);

            exist.Latitude = modify.Latitude;
            exist.Longitude = modify.Longitude;
            exist.Address = modify.Address;
            exist.LocationType = modify.LocationType;
            exist.AdsForm = modify.AdsForm;
            exist.Planned = modify.Planned;
            exist.Images = map.Images;

            try
            {
                _context.PointModifies.Remove(modify);
                await _context.SaveChangesAsync();

                return Ok(exist);
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật điểm quảng cáo"
                });
            }

            //_context.PointModifies.Remove(modify);
            //await _context.SaveChangesAsync();

            //return Ok(exist);
        }
    }
}
