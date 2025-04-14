import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(res.data.results);
      } catch (err) {
        setError("영화 데이터를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="px-4 py-8">
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      {!isLoading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
