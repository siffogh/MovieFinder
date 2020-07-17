import React from "react";
import MovieCard from "./MovieCard";
import "./App.css";
function MoviesCards({ moviesInfo }) {
  return (
    <div className="cardsContainer">
      {moviesInfo.map((movieInfo, index) => (
        <MovieCard key={index} movieInfo={movieInfo} />
      ))}
    </div>
  );
}

export default MoviesCards;
