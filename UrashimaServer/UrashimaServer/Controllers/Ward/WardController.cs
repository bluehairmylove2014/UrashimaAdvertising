using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Controllers.Ward
{
    [Route("api/ward")]
    [ApiController]
    public class WardController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WardController(DataContext context, IMapper mapper)
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

        // GET: api/ward/ad-request
        [HttpGet("ad-request")]
        public async Task<ActionResult<AdsCreationRequest>> GetAdsBoardRequestDetail([FromQuery] int id)
        {
            if (_context.AdsCreationRequests == null)
            {
                return NotFound();
            }

            var middle = await _context.RequestAdsBoards.Where(r => r.BoardID == id).FirstOrDefaultAsync();

            if (middle == null)
            {
                return NotFound();
            }

            var request = await _context.AdsCreationRequests.Where(r => r.PointID == middle.PointID).FirstOrDefaultAsync();
            return request;
        }
    }
}
