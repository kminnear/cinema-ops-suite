using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetMovies()
    {
        var movies = new List<Movie>
        {
            new Movie
            {
                id = 1,
                Title = "Dune: Part Two",
                Genre = "Sci-Fi",
                RuntimeMinutes = 166,
                Rating = "PG-13",
                PosterUrl = "https://placehold.co/300x450?text=Dune"
            },
            new Movie
            {
                id = 2,
                Title = "Inside Out 2",
                Genre = "Family Animation",
                RuntimeMinutes = 96,
                Rating = "PG",
                PosterUrl = "https://placehold.co/300x450?text=Inside+Out+2"
            }
        };

        return Ok(movies);
    }
}