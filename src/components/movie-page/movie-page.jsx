import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import PropTypes from "prop-types";
import {Operation as MovieOperation} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {getActiveMovie} from "../../reducer/movie-list-state/selectors.js";
import {getMovies, getFetchingStatus} from "../../reducer/data/selectors.js";
import Tabs from "../tabs/tabs.jsx";
import MoreMovies from "../more-movies/more-movies.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import history from "../../history.js";

const TabsWrapped = withActiveTab(Tabs);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movie,
      movies,
      dataFetching,
      authorizationStatus,
      user,
      handleClickMoreButton,
      handleClickFavoriteButton,
      handleLoadMovie,
    } = this.props;

    if (movie === undefined || Object.keys(movie).length === 0) {
      handleLoadMovie(movies, parseInt(this.props.match.params.number, 10));
    }

    if (!dataFetching) {

      return (
        <React.Fragment>
          <section className="movie-card movie-card--full">
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={movie.posterBig} alt="The Grand Budapest Hotel" />
              </div>
              <h1 className="visually-hidden">WTW</h1>
              <header className="page-header movie-card__head">
                <div className="logo">
                  <Link
                    className="logo__link"
                    to={AppRoute.ROOT}
                  >
                    <span className="logo__letter logo__letter--1">W</span>
                    <span className="logo__letter logo__letter--2">T</span>
                    <span className="logo__letter logo__letter--3">W</span>
                  </Link>
                </div>
                <div className="user-block">
                  {authorizationStatus === AuthorizationStatus.AUTH &&
                    <div className="user-block__avatar" >
                      <Link
                        to={AppRoute.MY_LIST}
                      >
                        <img src={user.avatar} alt="User avatar" width="63" height="63"/>
                      </Link>
                    </div>
                  }
                  {authorizationStatus === AuthorizationStatus.NO_AUTH &&
                    <Link
                      className="user-block__link"
                      to={AppRoute.SIGN_IN}
                      onClick = {handleClickMoreButton}
                    >
                      Sign in
                    </Link>
                  }
                </div>
              </header>
              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{movie.title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{movie.genre.join(`, `)}</span>
                    <span className="movie-card__year">{movie.date}</span>
                  </p>
                  <div className="movie-card__buttons">
                    <Link
                      className="btn btn--play movie-card__button"
                      to={{
                        pathname: `${AppRoute.MOVIE}/${movie.id}${AppRoute.PLAYER}`,
                        linkProp: {movie},
                      }}
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </Link>
                    <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                      return authorizationStatus === AuthorizationStatus.NO_AUTH ? history.push(AppRoute.SIGN_IN) : handleClickFavoriteButton(movie);
                    }}>
                      {movie.isFavorite &&
                          <svg viewBox="0 0 18 14" width={18} height={14}>
                            <use xlinkHref="#in-list"></use>
                          </svg>
                      }
                      {movie.isFavorite ||
                        <svg viewBox="0 0 19 20" width={19} height={20}>
                          <use xlinkHref="#add" />
                        </svg>
                      }
                      <span>My list</span>
                    </button>
                    <Link
                      className="btn movie-card__button"
                      to={{pathname: `${AppRoute.MOVIE}/${movie.id}${AppRoute.ADD_REVIEW}`}}
                    >
                      Add review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={movie.poster} alt={movie.title} width={218} height={327} />
                </div>
                <div className="movie-card__desc">
                  <TabsWrapped movie={movie} />
                </div>
              </div>
            </div>
          </section>
          <MoreMovies />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    poster: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  match: PropTypes.any.isRequired,
  dataFetching: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  handleClickMoreButton: PropTypes.func.isRequired,
  handleClickFavoriteButton: PropTypes.func.isRequired,
  handleLoadMovie: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
  movies: getMovies(state),
  dataFetching: getFetchingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickFavoriteButton(movie) {
    dispatch(MovieOperation.changeMovieStatus(movie.id, movie.isFavorite));
  },
  handleLoadMovie(movies, id) {
    dispatch(ActionCreator.getSelectedMovie(movies[id - 1]));
  },
  handleFetchMovie() {
    dispatch(DataOperation.dataFetchingStart());
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
