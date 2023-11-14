using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSecurity.Database;
using ApiSecurity.Database.Models;
using Microsoft.AspNetCore.Authorization;

namespace ApiSecurity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly DataContext _context;

        public ActorsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Actors
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Actor>>> GetActor()
        {
            if (_context.Actor == null)
            {
                return NotFound();
            }
            return await _context.Actor.ToListAsync();
        }
    }
}
