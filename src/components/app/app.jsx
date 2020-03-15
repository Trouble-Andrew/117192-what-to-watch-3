import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getMovies, getPromoMovie} from "../../reducer/data/selectors.js";
import {getActiveMovie, getFiltededList, getGenre, getVisibleMovies} from "../../reducer/movie-list-state/selectors.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderScreen() {
    const {
      promoMovie,
      activeMovie,
      filteredList,
      handleClickCard,
      authorizationStatus,
      login,
      user,
      visibleMovies,
      handleClickMoreButton,
    } = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          onSubmit={login}
        />
      );
    }

    if (Object.keys(activeMovie).length === 0) {
      return (
        <Main promoMovie={promoMovie} movies={filteredList} visibleMovies={visibleMovies} authorizationStatus={authorizationStatus} user={user} handleClickMoreButton={handleClickMoreButton} />
      );
    } else {
      handleClickCard(activeMovie);
      return (
        <MoviePage movie={activeMovie} authorizationStatus={authorizationStatus} user={user} />
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
          <Route exact path="/dev-auth">
            <SignIn
              onSubmit={() => {}}
            />
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
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleClickMoreButton: PropTypes.func.isRequired,
  visibleMovies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
  activeMovie: getActiveMovie(state),
  promoMovie: getPromoMovie(state),
  filteredList: getFiltededList(state),
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserInfo(state),
  visibleMovies: getVisibleMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickCard(movie) {
    dispatch(DataOperation.loadComments(movie.id));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  handleClickMoreButton() {
    dispatch(ActionCreator.incrementVisibleMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
