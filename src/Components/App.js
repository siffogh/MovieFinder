import React from "react";
import "./App.css";
import MoviesCards from "./MoviesCard";
function App() {
  const [moviesInfo, setmoviesInfo] = React.useState([]);
  const [typedInMovie, setTypedInMovie] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);
  const API_Key = "16c66b0f7fd3c3447e7067ff07db3197";

  function inputHandler(event) {
    if (event.key === "Enter") {
      setTypedInMovie(event.target.value);
    }
  }

  const fetchMovieInfo = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${typedInMovie}`
    )
      .then((response) => response.json())
      .then((data) => setmoviesInfo(data.results));
  };
  React.useEffect(() => {
    if (typedInMovie) {
      fetchMovieInfo();
    }
  }, [typedInMovie]);

  return (
    <div className="App">
      <h1>Movie Finder</h1>
      <input type="text" placeholder="Search" onKeyDown={inputHandler} />
      <MoviesCards moviesInfo={moviesInfo} />
    </div>
  );
}

export default App;
