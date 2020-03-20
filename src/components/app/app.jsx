import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getMovies, getPromoMovie, getFavoriteMovies} from "../../reducer/data/selectors.js";
import {getActiveMovie, getFiltededList, getGenre, getVisibleMovies} from "../../reducer/movie-list-state/selectors.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors.js";
import PrivateRoute from "../private-route/private-route.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const FullVideoPlayerWrapped = withTogglePlay(VideoPlayerFull);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      promoMovie,
      activeMovie,
      filteredList,
      authorizationStatus,
      login,
      user,
      visibleMovies,
      handleClickMoreButton,
      favoriteMovies,
      handleClickUser,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              promoMovie={promoMovie}
              movies={filteredList}
              visibleMovies={visibleMovies}
              authorizationStatus={authorizationStatus}
              user={user}
              handleClickMoreButton={handleClickMoreButton}
              handleClickUser={handleClickUser}
            />
          </Route>
          <Route exact path={AppRoute.SIGN_IN}>
            <SignIn
              onSubmit={login}
            />
          </Route>
          <Route exact path={`${AppRoute.MOVIE}/:number`}>
            <MoviePage
              movie={activeMovie}
              authorizationStatus={authorizationStatus}
              user={user}
              handleClickMoreButton={handleClickMoreButton}
              handleClickUser={handleClickUser} />
          </Route>
          <Route
            exact path={`${AppRoute.MOVIE}/:number${AppRoute.PLAYER}`}
            render={(routeProps) => (
              <FullVideoPlayerWrapped
                {...routeProps}
                isPlay={true}
              />
            )}
          />
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => {
              return (
                <MyList
                  movies={favoriteMovies}
                  user={user}
                />
              );
            }}
          />
        </Switch>
      </Router>
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
  favoriteMovies: PropTypes.array.isRequired,
  handleClickUser: PropTypes.func.isRequired,
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
  favoriteMovies: getFavoriteMovies(state),
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
  handleClickUser() {
    dispatch(DataOperation.loadFavoriteMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
