import React, { useContext } from "react";
import { StateContext, DispatchContext } from "../Contexts/Contexts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@material-ui/core/Checkbox";

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
    <div className="max-w-sm  overflow-hidden shadow-lg  mt-3 mb-6 rounded-lg shadow-2xl">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
        alt="404"
        className="  w-full object-cover "
      />

      <div className="py-2 bg-white text-black flex justify-around items-center">
        <span
          className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold  mr-2"
          role="img"
          aria-label="Star"
        >
          ⭐️ {movieInfo.vote_average}
        </span>
        <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold  mr-2">
          Vote: {movieInfo.vote_count}
        </span>
        <span className="inline-block  rounded-full px-3 py-1 text-sm   mr-2">
          <Checkbox color="default" onChange={checked} />
        </span>
      </div>
    </div>
  ) : null;
}

export default MovieCard;
