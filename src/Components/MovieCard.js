import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@material-ui/core/Checkbox";

import moviesContext from '../moviesContext';

toast.configure();

function MovieCard({ movie }) {
  const selectMovie = useContext(moviesContext);

  function onChange(event) {
    selectMovie(event.target.checked ? movie : null); 
  }

  return movie.poster_path ? (
    <div className="max-w-sm  overflow-hidden shadow-lg  mt-3 mb-6 rounded-lg shadow-2xl">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="404"
        className="  w-full object-cover "
      />

      <div className="py-2 bg-white text-black flex justify-around items-center">
        <span
          className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold  mr-2"
          role="img"
          aria-label="Star"
        >
          ⭐️ {movie.vote_average}
        </span>
        <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold  mr-2">
          Vote: {movie.vote_count}
        </span>
        <span className="inline-block  rounded-full px-3 py-1 text-sm   mr-2">
          <Checkbox color="default" onChange={onChange} />
        </span>
      </div>
    </div>
  ) : null;
}

export default MovieCard;
