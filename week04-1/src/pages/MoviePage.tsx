import { useParams, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

const categoryMap: Record<string, string> = {
  popular: "popular",
  upcoming: "upcoming",
  "top-rated": "top_rated",
  now_playing: "now_playing",
};

const MoviePage = () => {
  const { category: rawCategory = "popular" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const category = categoryMap[rawCategory] || "popular";

  const { data, isLoading, error } = useFetch<MoviesResponse>(
    `/movie/${category}?language=en-US&page=${page}`
  );

  const handlePrev = () => {
    if (page > 1) setSearchParams({ page: String(page - 1) });
  };

  const handleNext = () => {
    setSearchParams({ page: String(page + 1) });
  };

  return (
    <div className="px-4 py-8">
      {isLoading && <p className="text-center text-blue-500">로딩 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-1 gap-y-2">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-4 items-center">
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

            <span className="px-2 py-2 font-semibold">{page} 페이지</span>

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
