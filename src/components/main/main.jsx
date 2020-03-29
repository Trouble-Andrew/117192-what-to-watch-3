import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import MovieList from "../movie-list/movie-list.jsx";
import Filter from "../filter/filter.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import history from "../../history.js";

const FilterWrapped = withActiveTab(Filter);

class Main extends PureComponent {

  render() {
    const {
      promoMovie,
      movies,
      authorizationStatus,
      user,
      visibleMovies,
      handleMoreButtonClick,
      handleFavoriteButtonClick
    } = this.props;

    let showMoreFlag = true;

    if (movies.length > visibleMovies.length) {
      showMoreFlag = true;
    } else {
      showMoreFlag = false;
    }

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={promoMovie.posterBig} alt={promoMovie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH &&
                <div className="user-block__avatar">
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
                >
                  Sign in
                </Link>
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={promoMovie.poster} alt={promoMovie.title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovie.genres}</span>
                  <span className="movie-card__year">{promoMovie.date}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    className="btn btn--play movie-card__button"
                    to={{
                      pathname: `${AppRoute.MOVIE}/${promoMovie.id}${AppRoute.PLAYER}`,
                    }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                    return authorizationStatus === AuthorizationStatus.NO_AUTH ? history.push(AppRoute.SIGN_IN) : handleFavoriteButtonClick(promoMovie);
                  }}>
                    {promoMovie.isFavorite &&
                        <svg viewBox="0 0 18 14" width={18} height={14}>
                          <use xlinkHref="#in-list"></use>
                        </svg>
                    }
                    {promoMovie.isFavorite ||
                      <svg viewBox="0 0 19 20" width={19} height={20}>
                        <use xlinkHref="#add" />
                      </svg>
                    }
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <FilterWrapped movies={movies} />

            <MovieList movies={visibleMovies} />

            {showMoreFlag && <div className="catalog__more">
              <button className="catalog__button" type="button" onClick={handleMoreButtonClick}>Show more</button>
            </div>}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  promoMovie: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        directors: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ).isRequired,
  visibleMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        directors: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ).isRequired,
  user: PropTypes.any.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  handleMoreButtonClick: PropTypes.func.isRequired,
  handleFavoriteButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleFavoriteButtonClick(movie) {
    dispatch(DataOperation.changeMovieStatus(movie.id, movie.isFavorite));
  },
});

export {Main};
export default connect(null, mapDispatchToProps)(Main);
