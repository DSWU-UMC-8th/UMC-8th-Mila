import React from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative w-[180px] h-[270px] rounded-xl overflow-hidden shadow-md group">
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* hover 시 보여지는 overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-3">
        <h3 className="text-white text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
