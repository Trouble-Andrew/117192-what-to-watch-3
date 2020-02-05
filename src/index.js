import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

ReactDOM.render(
    <App
      movieData={PromoMovie}
    />,
    document.querySelector(`#root`)
);
