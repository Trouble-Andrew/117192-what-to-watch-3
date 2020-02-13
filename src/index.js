import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

ReactDOM.render(
    <App
      movieData={PromoMovie} films={films}
    />,
    document.querySelector(`#root`)
);
