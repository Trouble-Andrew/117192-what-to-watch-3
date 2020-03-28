import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getFavoriteMovies} from "../../reducer/data/selectors.js";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";

const SmallMovieCardWrapped = withTogglePlay(SmallMovieCard);

class MyList extends PureComponent {

  constructor(props) {
    super(props);

    this._firstLoad = true;
  }

  render() {
    const {
      user,
      favoriteMovies,
      handleMovieLoads,
      stop,
    } = this.props;


    if (this._firstLoad & stop !== true) {
      handleMovieLoads();
      this._firstLoad = false;
    }

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
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
          <h1 className="page-title user-page__title">My list</h1>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src={user.avatar} alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <div className="catalog__movies-list">
            {favoriteMovies.map((film, index) => (
              <SmallMovieCardWrapped movie={film} key={index}/>
            ))}
          </div>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link
              className="logo__link logo__link--light"
              to={AppRoute.ROOT}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

MyList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
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
  stop: PropTypes.oneOfType([
    PropTypes.shape({
    }),
    PropTypes.bool.isRequired,
  ]),
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
  handleMovieLoads: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieLoads() {
    dispatch(DataOperation.loadFavoriteMovies());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);

