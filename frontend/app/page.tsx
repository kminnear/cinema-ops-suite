type Movie = {
  id: number;
  title: string;
  genre: string;
  runtimeMinutes: number;
  rating: string;
  posterUrl: string;
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

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Cinema Ops Suite</h1>
      <p className="text-gray-400 mb-8">
        A modern cinema operations and guest experience platform.
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400">{movie.genre}</p>
              <p className="text-sm text-gray-500 mt-2">
                {movie.rating} • {movie.runtimeMinutes} min
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
