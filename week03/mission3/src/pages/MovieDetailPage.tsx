// src/pages/MovieDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, Credit, CreditsResponse } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [movieRes, creditRes] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              },
            }
          ),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              },
            }
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        setError("영화 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isLoading) return <p className="text-center mt-10">로딩 중...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 배경 블러 이미지 */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL + movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg mb-1">평균 {movie.vote_average}</p>
          <p className="mb-1">{movie.release_date?.slice(0, 4)}</p>
          <p className="mb-2">{movie.runtime}분</p>
          <p className="italic text-base text-yellow-300 mb-4">
            {movie.tagline}
          </p>
          <p className="max-w-2xl leading-relaxed text-sm">{movie.overview}</p>
        </div>
      </div>

      {/* 캐스트 */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits?.cast.slice(0, 12).map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <img
                src={
                  person.profile_path
                    ? IMAGE_BASE_URL + person.profile_path
                    : "/no-profile.png"
                }
                alt={person.name}
                className="w-24 h-24 object-cover rounded-full shadow-md"
              />
              <p className="mt-2 text-sm font-semibold text-center">
                {person.name}
              </p>
              <p className="text-xs text-gray-400 text-center">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
