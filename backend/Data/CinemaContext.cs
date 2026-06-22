using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class CinemaContext : DbContext
{
    public CinemaContext(DbContextOptions<CinemaContext> options)
        : base(options)
    {
    }

    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<Showtime> Showtimes => Set<Showtime>();
}