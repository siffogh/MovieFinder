import React, { useContext } from "react";
import { StateContext, DispatchContext } from "../Contexts/Contexts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

toast.configure();

function MovieCard({ movieInfo }) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  if (appState.chosenMovie) {
    toast(`Enjoy your movie: ${appState.moviesInfo[0].title}!`);
  }

  function checked() {
    const selectedMovie = appState.moviesInfo.filter(
      (movie) => movie.id === movieInfo.id
    );
    appDispatch({
      type: "SELECT_MOVIE",
      payload: selectedMovie,
    });
  }

  return movieInfo.poster_path ? (
    <div className="movieCard ">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
        alt="404"
      />

      <div className="flex justify-around items-center">
        <div>
          <span className="star" role="img" aria-label="Star">
            ⭐️ {movieInfo.vote_average}
          </span>
        </div>
        <div>
          <span> Vote:{movieInfo.vote_count}</span>
        </div>
        <div>
          <span>
            <input type="checkbox" onClick={checked} />
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default MovieCard;
