using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp.net_w2.Database;
using asp.net_w2.Database.Models;

namespace asp.net_w2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApiDBContext _context;

        public ActorsController(ApiDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// DAT DEP TRAI.
        /// </summary>
        // GET: api/Actors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actor>>> GetActor()
        {
          if (_context.Actor == null)
          {
              return NotFound();
          }
            return await _context.Actor.ToListAsync();
        }

        /// <summary>
        /// DAT DEP TRAI.
        /// </summary>
        // GET: api/Actors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Actor>> GetActor(int id)
        {
          if (_context.Actor == null)
          {
              return NotFound();
          }
            var actor = await _context.Actor.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        /// <summary>
        /// DAT DEP TRAI.
        /// </summary>
        // PUT: api/Actors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actor actor)
        {
            if (id != actor.actor_Id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// DAT DEP TRAI.
        /// </summary>
        // POST: api/Actors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Actor>> PostActor(Actor actor)
        {
          if (_context.Actor == null)
          {
              return Problem("Entity set 'ApiDBContext.Actor'  is null.");
          }
            _context.Actor.Add(actor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActor", new { id = actor.actor_Id }, actor);
        }

        /// <summary>
        /// DAT DEP TRAI.
        /// </summary>
        // DELETE: api/Actors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            if (_context.Actor == null)
            {
                return NotFound();
            }
            var actor = await _context.Actor.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.Actor.Remove(actor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActorExists(int id)
        {
            return (_context.Actor?.Any(e => e.actor_Id == id)).GetValueOrDefault();
        }
    }
}
