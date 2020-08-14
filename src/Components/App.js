import React from "react";
import { useEffect, useReducer } from "react";
import { StateContext, DispatchContext } from "../Contexts/Contexts";
import MoviesCards from "./MoviesCard";
import axios from "axios";

import "./App.css";

const initialState = {
  moviesInfo: [],
  typedMovie: "",
  submittedMovie: "",
  chosenMovie: false,
  isLoading: false,
  isError: false,
};

const reducer = (state, action) => {
  if (action.type === "TYPING_MOVIE") {
    return {
      ...state,
      typedInMovie: action.payload,
    };
  }
  if (action.type === "SUBMIT_MOVIE") {
    return {
      ...state,
      submittedMovie: action.payload,
    };
  }

  // case "FETCH_DATA":
  //   return {
  //     ...state,
  //     isLoading: true,
  //     isError: false,
  //   };

  if (action.type === "FETCH_DATA_SUCCESS") {
    return {
      ...state,
      moviesInfo: action.payload,
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

  if (action.type === "SELECT_MOVIE") {
    return {
      ...state,
      moviesInfo: action.payload,
      chosenMovie: true,
    };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const API_Key = "16c66b0f7fd3c3447e7067ff07db3197";

  function inputChange(event) {
    dispatch({
      type: "TYPING_MOVIE",
      payload: event.target.value,
    });
  }

  function inputSubmit(event) {
    if (event.key === "Enter") {
      dispatch({
        type: "SUBMIT_MOVIE",
        payload: event.target.value,
      });
    }
  }

  useEffect(() => {
    if (state.submittedMovie) {
      const fetchData = async () => {
        // dispatch({ type: "FETCH_DATA" });
        try {
          const result = await axios(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovie}`
          );

          dispatch({
            type: "FETCH_DATA_SUCCESS",
            payload: result.data.results,
          });
        } catch (error) {
          // dispatch({ type: "FETCH_FAILURE" });
        }
      };
      fetchData();
    }
  }, [state.submittedMovie]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className=" sm:auto md:auto lg:auto bg-white shadow-2xl h-screen mx-auto flex flex-col items-center justify-center">
          <h1 className="  text-5xl font-light py-2"> Movie Finder</h1>
          <input
            type="text"
            placeholder="Search"
            className=" rounded shadow-2xl outline-none py-2 px-2"
            onChange={inputChange}
            onKeyDown={inputSubmit}
          />
          <MoviesCards />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
