using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private static readonly List<Movie> Movies =
    [
        new Movie
        {
            Id = 1,
            Title = "Dune: Part Two",
            Genre = "Sci-Fi",
            RuntimeMinutes = 166,
            Rating = "PG-13",
            PosterUrl = "https://placehold.co/300x450?text=Dune"
        },
        new Movie
        {
            Id = 2,
            Title = "Inside Out 2",
            Genre = "Animation",
            RuntimeMinutes = 96,
            Rating = "PG",
            PosterUrl = "https://placehold.co/300x450?text=Inside+Out+2"
        }
    ];

    private static readonly List<Showtime> Showtimes =
    [
        new Showtime
        {
            Id = 1,
            MovieId = 1,
            TheatreName = "Minnear Cinemas",
            Auditorium = "Auditorium 1",
            StartTime = DateTime.Today.AddHours(14).AddMinutes(30),
            TicketPrice = 18.00m
        },
        new Showtime
        {
            Id = 2,
            MovieId = 2,
            TheatreName = "Minnear Cinemas",
            Auditorium = "Auditorium 2",
            StartTime = DateTime.Today.AddHours(15),
            TicketPrice = 18.00m
        },
        new Showtime
        {
            Id = 3,
            MovieId = 1,
            TheatreName = "Minnear Cinemas",
            Auditorium = "Auditorium 3",
            StartTime = DateTime.Today.AddHours(18).AddMinutes(30),
            TicketPrice = 18.00m
        }
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetMovies()
    {
        return Ok(Movies);
    }

    [HttpGet("{movieId}/showtimes")]
    public ActionResult<IEnumerable<Showtime>> GetShowtimesForMovie(int movieId)
    {
        var movieExists = Movies.Any(movie => movie.Id == movieId);

        if (!movieExists)
        {
            return NotFound();
        }

        var showtimes = Showtimes
            .Where(showtime => showtime.MovieId == movieId)
            .OrderBy(showtime => showtime.StartTime)
            .ToList();

        return Ok(showtimes);
    }
}