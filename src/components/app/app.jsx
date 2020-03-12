import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getMovies, getPromoMovie} from "../../reducer/data/selectors.js";
import {getActiveMovie, getFiltededList, getGenre} from "../../reducer/movie-list-state/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderScreen() {
    const {promoMovie, activeMovie, filteredList, handleClickCard} = this.props;

    if (Object.keys(activeMovie).length === 0) {
      return (
        <Main promoMovie={promoMovie} movies={filteredList} />
      );
    } else {
      handleClickCard(activeMovie);
      return (
        <MoviePage movie={activeMovie} />
      );
    }
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/movie-page">
            {this._renderScreen()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.object.isRequired,
  filteredList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genre: PropTypes.array.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
      })
  ).isRequired,
  activeMovie: PropTypes.object.isRequired,
  handleClickCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
  activeMovie: getActiveMovie(state),
  promoMovie: getPromoMovie(state),
  filteredList: getFiltededList(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickCard(movie) {
    dispatch(DataOperation.loadComments(movie.id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
