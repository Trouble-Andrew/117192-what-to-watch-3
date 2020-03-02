import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

ReactDOM.render(
    <Provider store={store}>
      <App
        movieData={PromoMovie} films={films}
      />
    </Provider>,
    document.querySelector(`#root`)
);
