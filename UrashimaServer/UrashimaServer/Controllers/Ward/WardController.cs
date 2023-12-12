using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        // [HttpPost("board-modification")]
        // public async Task<ActionResult<BoardModify>> BoardModify(BoardModify BoardModifyRequest)
        // {
        //     _context.BoardModifies.Add(BoardModifyRequest);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction("BoardModify", new { id = BoardModifyRequest.Id }, BoardModifyRequest);
        // }

        // GET: api/ward/ad-request
        [HttpGet("ad-request")]
        public async Task<ActionResult<AdsCreationRequest>> GetAdsBoardRequestDetail([FromQuery] int id)
        {
            if (_context.AdsCreationRequests == null)
            {
                return NotFound();
            }

            AdsCreationRequest? result = null;
            var rawRequest = await _context.AdsCreationRequests
                .Include(s => s.AdsBoards)
                .ToListAsync();

            foreach (var req in rawRequest)
            {
                var value = req.AdsBoards?.AsQueryable().Where(b => b.Id == id);
                if (!value.IsNullOrEmpty()) {
                    result = req;
                    break;
                }
            }

            if (result == null) {
                return NotFound();
            }
            
            return result;
        }
    }
}
