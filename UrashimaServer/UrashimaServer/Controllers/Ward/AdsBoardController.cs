using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers.Ward
{
    [Route("api/ward")]
    [ApiController]
    public class AdsBoardController : ControllerBase
    {
        private readonly DataContext _context;
        readonly IMapper _mapper;

        public AdsBoardController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ward/ad-board
        [HttpGet("ad-board")]
        public async Task<ActionResult<AdsBoardBasicDto>> GetAdsBoardDetail([FromQuery] int id)
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            var adsBoard = await _context.AdsBoards.FindAsync(id);

            if (adsBoard == null)
            {
                return NotFound();
            }

            var res = _mapper.Map<AdsBoardBasicDto>(adsBoard);

            return res;
        }

        // GET: api/ward/ad-board/5
        [HttpGet("/ad-board/{id}")]
        public async Task<ActionResult<AdsBoard>> GetAdsBoard(int id)
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }
            var adsBoard = await _context.AdsBoards.FindAsync(id);

            if (adsBoard == null)
            {
                return NotFound();
            }

            return adsBoard;
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

        private bool AdsBoardExists(int id)
        {
            return (_context.AdsBoards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
