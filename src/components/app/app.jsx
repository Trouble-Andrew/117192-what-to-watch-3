import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getPromoMovie, getFavoriteMovies} from "../../reducer/data/selectors.js";
import {getActiveMovie, getFiltededList, getGenre, getVisibleMovies} from "../../reducer/movie-list-state/selectors.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors.js";
import PrivateRoute from "../private-route/private-route.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";
import withFormValue from "../../hocs/with-form-value/with-form-value.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const FullVideoPlayerWrapped = withTogglePlay(VideoPlayerFull);
const AddReviewWrapped = withFormValue(AddReview);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {


    const {
      movies,
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
      // handleLoadMovie,
    } = this.props;

    console.log(movies);
    console.log(activeMovie);

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
          <Route exact path={AppRoute.SIGN_IN} render={
            () => {
              return authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.ROOT} /> : <SignIn onSubmit={login} />;
            }
          }>
          </Route>
          <Route
            exact
            path={`${AppRoute.MOVIE}/:number`}
            render={(routeProps) => {
              // if (Object.keys(activeMovie).length === 0) {
              //   console.log(`NONE`);
              //   handleLoadMovie(movies, parseInt(routeProps.match.params.number, 10));
              // }
              return (
                <MoviePage
                  {...routeProps}
                  user={user}
                  authorizationStatus={authorizationStatus}
                  handleClickMoreButton={handleClickMoreButton}
                  handleClickUser={handleClickUser}
                />
              );
            }}
          />
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
              return authorizationStatus === AuthorizationStatus.NO_AUTH ? <Redirect to={AppRoute.SIGN_IN} /> : <MyList movies={favoriteMovies} user={user} />;
            }}
          />
          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE}/:number${AppRoute.ADD_REVIEW}`}
            render={() => {
              return (
                <AddReviewWrapped
                  movie={activeMovie}
                  user={user}
                  handleClickUser={handleClickUser}
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
  movies: PropTypes.array.isRequired,
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
  handleLoadMovie: PropTypes.func.isRequired,
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
  handleLoadMovie(movies, id) {
    dispatch(ActionCreator.getSelectedMovie(movies[id]));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
