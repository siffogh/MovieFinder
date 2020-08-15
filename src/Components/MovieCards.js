import React from "react";
import MovieCard from "./MovieCard";


export default function MovieCards({movies}) {
  return (
    <div className="overflow-auto my-3" >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
