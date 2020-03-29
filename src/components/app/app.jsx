import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getPromoMovie} from "../../reducer/data/selectors.js";
import {getActiveMovie, getFiltededList, getVisibleMovies} from "../../reducer/movie-list-state/selectors.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {getAuthorizationStatus, getUserInfo, getUserFetchingStatus} from "../../reducer/user/selectors.js";
import PrivateRoute from "../private-route/private-route.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";
import withFormValue from "../../hocs/with-form-value/with-form-value.jsx";
import withFormValidation from "../../hocs/with-form-validation/with-form-validation.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getFetchingStatus} from "../../reducer/data/selectors.js";

const FullVideoPlayerWrapped = withTogglePlay(VideoPlayerFull);
const AddReviewWrapped = withFormValue(AddReview);
const SignInwWrapped = withFormValidation(SignIn);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      promoMovie,
      filteredList,
      authorizationStatus,
      user,
      visibleMovies,
      handleMoreButtonClick,
      dataFetching,
    } = this.props;

    if (!dataFetching) {
      return (
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={AppRoute.ROOT}>
              <Main
                promoMovie={promoMovie}
                movies={filteredList}
                visibleMovies={visibleMovies}
                authorizationStatus={authorizationStatus}
                user={user}
                handleMoreButtonClick={handleMoreButtonClick}
              />
            </Route>
            <Route exact path={AppRoute.SIGN_IN} render={
              () => {
                return authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.ROOT} /> : <SignInwWrapped />;
              }
            }>
            </Route>
            <Route
              exact
              path={`${AppRoute.MOVIE}/:number`}
              render={(routeProps) => {
                return (
                  <MoviePage
                    {...routeProps}
                    authorizationStatus={authorizationStatus}
                    user={user}
                    handleMoreButtonClick={handleMoreButtonClick}
                  />
                );
              }}
            />
            <Route
              exact
              path={`${AppRoute.MOVIE}/:number${AppRoute.PLAYER}`}
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
                return authorizationStatus === AuthorizationStatus.NO_AUTH ? <Redirect to={AppRoute.SIGN_IN} /> : <MyList user={user} />;
              }}
            />
            <PrivateRoute
              exact
              path={`${AppRoute.MOVIE}/:number${AppRoute.ADD_REVIEW}`}
              render={(routeProps) => {
                return (
                  <AddReviewWrapped
                    {...routeProps}
                    user={user}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      );
    } else {
      return null;
    }
  }
}

App.propTypes = {
  promoMovie: PropTypes.object.isRequired,
  filteredList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        directors: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
      })
  ).isRequired,
  activeMovie: PropTypes.object.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.shape({
    }),
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ]),
  handleMoreButtonClick: PropTypes.func.isRequired,
  visibleMovies: PropTypes.array.isRequired,
  dataFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  activeMovie: getActiveMovie(state),
  promoMovie: getPromoMovie(state),
  filteredList: getFiltededList(state),
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserInfo(state),
  visibleMovies: getVisibleMovies(state),
  dataFetching: getFetchingStatus(state),
  userFetching: getUserFetchingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMoreButtonClick() {
    dispatch(ActionCreator.incrementVisibleMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
