import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { StateContext } from "../Contexts/Contexts";

import "./App.css";

function MoviesCards() {
  const appState = useContext(StateContext);
  return (
    <div className="cardsContainer">
      {appState.moviesInfo.map((movieInfo) => (
        <MovieCard key={movieInfo.id} movieInfo={movieInfo} />
      ))}
    </div>
  );
}

export default MoviesCards;
