using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerB.Database;
using ServerB.Database.Models;

namespace ServerB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly DataContext _context;

        public FilmsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Films
        [HttpGet, Authorize(Policy = "ApiKeyPolicy")]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilm()
        {
            if (_context.Film == null)
            {
                return NotFound();
            }
            var res = await _context.Film.ToListAsync();

            return Ok(res.Take(5));
        }

    }
}
