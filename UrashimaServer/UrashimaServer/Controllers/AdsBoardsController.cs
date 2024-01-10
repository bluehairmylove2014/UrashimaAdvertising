﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller quản lý bảng quảng cáo.
    /// </summary>
    [Route("api/ads-board")]
    [ApiController]
    public class AdsBoardsController : ControllerBase
    {
        private readonly DataContext _context;
        readonly IMapper _mapper;

        public AdsBoardsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// API lấy chi tiết bảng quảng cáo bằng id.
        /// </summary>
        // GET: api/ads-board/detail?id=5
        [HttpGet("detail")]
        public async Task<ActionResult<AdsBoardBasicDto>> GetAdsBoardDetail([FromQuery, Required] int id)
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

        // -----------------------------------

        /// <summary>
        /// API lấy danh sách bảng quảng cáo.
        /// </summary>
        // GET: api/ads-board
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdsBoard>>> GetAdsBoards()
        {
            if (_context.AdsBoards == null)
            {
                return NotFound();
            }

            var rawBoards = await _context.AdsBoards
                .Include(s => s.AdsPoint)
                .Include(s => s.AdsCreateRequest)
                .Include(s => s.Reports)
                .ToListAsync();

            var result = rawBoards.Where(board 
                => board.AdsCreateRequest == null || 
                board.AdsCreateRequest.RequestStatus == RequestConstant.Accepted);

            // map each element
            var boardDtoList = new List<GetAdsBoardDto>();

            foreach (var item in result)
            {
                var boardDto = _mapper.Map<GetAdsBoardDto>(item);
                boardDtoList.Add(boardDto);
            }

            return Ok(boardDtoList);
        }

        /// <summary>
        /// API tạo bảng quảng cáo.
        /// </summary>
        // POST: api/ads-board
        [HttpPost]
        public async Task<ActionResult<AdsBoardBasicDto>> PostAdsBoard(AdsBoardBasicDto adsBoard)
        {
            if (_context.AdsBoards == null)
            {
                return Problem("Không thể kết nối đến cơ sở dữ liệu");
            }
            _context.AdsBoards.Add(_mapper.Map<AdsBoard>(adsBoard));

            try
            {
                await _context.SaveChangesAsync();
            } catch
            {
                return BadRequest(new
                {
                    Message = "Tạo bảng quảng cáo không thành công, vui lòng thử lại"
                });
            }

            return CreatedAtAction("GetAdsBoardDetail", new { id = adsBoard.Id }, adsBoard);
        }
    }
}
