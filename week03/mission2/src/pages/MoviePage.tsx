import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

const categoryMap: Record<string, string> = {
  popular: "popular",
  upcoming: "upcoming",
  "top-rated": "top_rated",
  now_playing: "now_playing",
};

const MoviePage = () => {
  const { category: rawCategory = "popular" } = useParams();
  const category = categoryMap[rawCategory] || "popular";

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
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
  }, [category, page]);

  const handlePrev = () => {
    if (page > 1) setSearchParams({ page: String(page - 1) });
  };

  const handleNext = () => {
    setSearchParams({ page: String(page + 1) });
  };

  return (
    <div className="px-4 py-8">
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      {!isLoading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              이전
            </button>
            <span className="px-2 py-2">{page} 페이지</span>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
