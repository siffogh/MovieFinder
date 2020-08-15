import React from "react";
import { useEffect, useReducer } from "react";
import moviesContext from "../moviesContext";
import MovieCards from "./MovieCards";
import axios from "axios";

const ACTION = {
  TYPE_SEARCH: "TYPE_SEARCH",
  SUBMIT_SEARCH: "SUBMIT_SEARCH",
  FETCH_DATA: "FETCH_DATA",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
  SELECT_MOVIE: "SELECT_MOVIE"
};


const initialState = {
  movies: [],
  search: "",
  submittedSearch: "",
  selectedMovie: "",
  isLoading: false,
  isError: false,
};

const reducer = (state, action) => {
  if (action.type === ACTION.TYPE_SEARCH) {
    return {
      ...state,
      search: action.payload,
    };
  }

  if (action.type === ACTION.SUBMIT_SEARCH) {
    return {
      ...state,
      submittedSearch: state.search,
    };
  }

  // case "FETCH_DATA":
  //   return {
  //     ...state,
  //     isLoading: true,
  //     isError: false,
  //   };

  if (action.type === ACTION.FETCH_DATA_SUCCESS) {
    return {
      ...state,
      movies: action.payload,
      isLoading: false,
      isError: false,
    };
  }

  // case "FETCH_DATA_FAIL":
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isError: true,
  //   };

  if (action.type === ACTION.SELECT_MOVIE) {
    return {
      ...state,
      selectedMovie: action.payload,
    };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state)
  const API_Key = "16c66b0f7fd3c3447e7067ff07db3197";

  function inputChange(event) {
    dispatch({
      type: ACTION.TYPE_SEARCH,
      payload: event.target.value,
    });
  }

  function onSubmit(event) {
      event.preventDefault();
      dispatch({
        type: ACTION.SUBMIT_SEARCH
      });
  }

  useEffect(() => {
    if (state.submittedSearch) {
      const fetchData = async () => {
        // dispatch({ type: "FETCH_DATA" });
        try {
          const result = await axios(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedSearch}`
          );

          dispatch({
            type: ACTION.FETCH_DATA_SUCCESS,
            payload: result.data.results,
          });
        } catch (error) {
          // dispatch({ type: "FETCH_FAILURE" });
        }
      };
      fetchData();
    }
  }, [state.submittedSearch]);

  function selectMovie(movie) {
    dispatch({
      type: ACTION.SELECT_MOVIE,
      payload: movie
    })
  }

  const filteredMovies = !state.selectedMovie ? state.movies : [state.selectedMovie];

  return (
      <moviesContext.Provider value={selectMovie}>
        <div className=" app w-1/2 h-screen sm:auto md:auto lg:auto  shadow-2xl h-screen mx-auto flex flex-col items-center">
          <div>
            <span className="  text-5xl font-light text-white py-2 ">
              Movie
            </span>
            <span className="  text-5xl font-light text-white py-2 px-2 text-red-600 ">
              Finder
            </span>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Search"
              className=" rounded shadow-2xl outline-none py-2 px-2"
              onChange={inputChange}
            />
          </form>
          <MovieCards movies={filteredMovies}/>
        </div>
      </moviesContext.Provider>
  );
}

export default App;
