using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Ward
{
    [Route("api/ward")]
    [ApiController]
    public class AdsModifyController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AdsModifyController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // POST: api/ward/point-modification
        [HttpPost("point-modification")]
        public async Task<ActionResult<PointModify>> PointModify(PointModify PointModifyRequest)
        {
            _context.PointModifies.Add(PointModifyRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PointModify", new { id = PointModifyRequest.Id }, PointModifyRequest);
        }

        // POST: api/ward/board-modification
        [HttpPost("board-modification")]
        public async Task<ActionResult<BoardModify>> BoardModify(BoardModify BoardModifyRequest)
        {
            _context.BoardModifies.Add(BoardModifyRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("BoardModify", new { id = BoardModifyRequest.Id }, BoardModifyRequest);
        }

        // POST: api/ward/board-modification, , Authorize(Roles = GlobalConstant.WardOfficer)
        [HttpGet("reports")]
        public async Task<ActionResult<List<Report>>> GetWardReports()
        {
            //Account? currentAcc = await _context.Accounts.FirstOrDefaultAsync((a) => a.FullName == User.Identity.Name);

            //if (currentAcc is null)
            //{
            //    return BadRequest(new
            //    {
            //        Message = "Account error!"
            //    });
            //}

            var results = await _context.Reports.ToListAsync() ?? new List<Report>();

            return results;
        }
    }
}
