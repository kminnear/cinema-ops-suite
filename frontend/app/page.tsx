type Movie = {
  id: number;
  title: string;
  genre: string;
  runtimeMinutes: number;
  rating: string;
  posterUrl: string;
};

type Showtime = {
  id: number;
  movieId: number;
  theatreName: string;
  auditorium: string;
  startTime: string;
  ticketPrice: number;
};

async function getMovies(): Promise<Movie[]> {
  const res = await fetch("http://localhost:5188/api/movies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

async function getShowtimes(movieId: number): Promise<Showtime[]> {
  const res = await fetch(
    `http://localhost:5188/api/movies/${movieId}/showtimes`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const movies = await getMovies();

  const moviesWithShowtimes = await Promise.all(
    movies.map(async (movie) => ({
      ...movie,
      showtimes: await getShowtimes(movie.id),
    }))
  );

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-2 text-red-500">
        Cinema Ops Suite
      </h1>

      <p className="text-zinc-400 mb-10">
        Smart cinema operations and guest engagement platform.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {moviesWithShowtimes.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-[500px] object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">{movie.title}</h2>

              <p className="text-zinc-400 mt-1">
                {movie.genre} • {movie.rating}
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                Runtime: {movie.runtimeMinutes} min
              </p>

              <div className="mt-5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">
                  Showtimes
                </h3>

                <div className="flex flex-wrap gap-2">
                  {movie.showtimes.map((showtime) => (
                    <div
                      key={showtime.id}
                      className="bg-zinc-800 px-3 py-2 rounded-lg text-sm"
                    >
                      {new Date(showtime.startTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}