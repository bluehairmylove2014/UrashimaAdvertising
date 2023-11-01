using ApiValidation.Database;
using ApiValidation.Models;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ApiValidation.Controllers
{
    [ApiController]
    [Route("api/film")]
    public class FilmController : Controller
    {
        private readonly ApiDbContext _dbContext;

        public FilmController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Film>), 200)]
        public async Task<ActionResult<IEnumerable<Film>>> GetAllFilms()
        {
            if (_dbContext == null)
            {
                return Problem("Cannot connect to database");
            }

            return Ok(await _dbContext.Film.ToListAsync());
        }

        /// <summary>
        /// get a specific film
        /// </summary>
        [HttpGet("spec")]
        [ProducesResponseType(typeof(Film), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesErrorResponseType(typeof(string))]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<ActionResult<Film>> GetFilm([FromQuery] GetSpecificFilm filmId)
        {
            if (_dbContext == null)
            {
                return Problem("Cannot connect to database");
            }

            var result = await _dbContext.Film.FirstOrDefaultAsync((film) => film.film_id == filmId.id);

            if (result == null)
            {
                return BadRequest("cannot find film");
            }

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Film), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<ActionResult<Film>> PostFilm(Film film, [FromServices] IValidator<Film> validator)
        {
            if (_dbContext == null)
            {
                return Problem("Cannot connect to database");
            }

            try
            {
                _dbContext.Film.Add(film);
                await _dbContext.SaveChangesAsync();
            } catch(DbUpdateException ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }

            return CreatedAtAction("GetFilm", new { id = film.film_id }, film); ;
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(typeof(Film), 400)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 500)]
        public async Task<ActionResult> PutFilm(int id, Film film)
        {
            if (id != film.film_id)
            {
                return BadRequest("ids do not match");
            }

            try
            {
                _dbContext.Film.Update(film);
                await _dbContext.SaveChangesAsync();
            } catch(DbUpdateException ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesErrorResponseType(typeof(string))]
        public async Task<ActionResult> DeleteFilm(int id)
        {
            var film = await _dbContext.Film.FindAsync(id);

            if (film is null)
            {
                return BadRequest("cannot find film");
            }

            _dbContext.Film.Remove(film);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
