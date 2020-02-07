import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

const movies = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`},
  {title: `Bohemian Rhapsody`},
  {title: `Macbeth`}
];

ReactDOM.render(
    <App
      movieData={PromoMovie} movies={movies}
    />,
    document.querySelector(`#root`)
);
