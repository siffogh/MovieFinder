import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { StateContext } from "../Contexts/Contexts";


function MoviesCards() {
  const appState = useContext(StateContext);
  return (
    <div className="overflow-auto my-3" >
      {appState.moviesInfo.map((movieInfo) => (
        <MovieCard key={movieInfo.id} movieInfo={movieInfo} />
      ))}
    </div>
  );
}

export default MoviesCards;
