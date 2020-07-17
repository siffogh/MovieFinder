import React from "react";
import "./App.css";
function MovieCard({ movieInfo }) {
  return movieInfo.poster_path && movieInfo.vote_average ? (
    <div className="movieCard">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
        alt="404"
      />

      <div className="movieRate">
        <p>
          <span className="star" role="img" aria-label="Star">
            ⭐️ {movieInfo.vote_average}
          </span>
        </p>
        <p>
          <span> Vote:{movieInfo.vote_count}</span>
        </p>
      </div>
    </div>
  ) : null;
}

export default MovieCard;
