using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.HQ
{
    [Route("api")]
    [ApiController]
    public class ApproveController : ControllerBase
    {
        private readonly DataContext _context;

        public ApproveController(DataContext context)
        {
            _context = context;
        }

        [HttpPut("/approve-board")]
        public async Task<IActionResult> ApproveBoard(BoardModify boardModify)
        {
            if (boardModify == null)
            {
                return BadRequest();
            }

            var exist = await _context.AdsBoards.FindAsync(boardModify.Id);

            exist.AdsPointId = boardModify.AdsPointId;
            exist.AdsType = boardModify.AdsType;
            exist.Width = boardModify.Width;
            exist.Height = boardModify.Height;
            exist.Image = boardModify.Image;
            exist.ExpiredDate = boardModify.ExpiredDate;

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

            var del = await _context.BoardModifies.FindAsync(boardModify.Id);

            _context.BoardModifies.Remove(del);
            await _context.SaveChangesAsync();

            return Ok(exist);
        }

        [HttpPut("/approve-point")]
        public async Task<IActionResult> ApprovePoint(PointModify pointModify)
        {
            if (pointModify == null)
            {
                return BadRequest();
            }

            var exist = await _context.AdsPoints.FindAsync(pointModify.Id);

            exist.Longitude = pointModify.Longitude;
            exist.Latitude = pointModify.Latitude;
            exist.Address = pointModify.Address;
            exist.LocationType = pointModify.LocationType;
            exist.AdsForm = pointModify.AdsForm;
            exist.Planned = pointModify.Planned;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể cập nhật điểm quảng cáo"
                });
            }

            var del = await _context.BoardModifies.FindAsync(pointModify.Id);

            _context.BoardModifies.Remove(del);
            await _context.SaveChangesAsync();

            return Ok(exist);
        }
    }
}
