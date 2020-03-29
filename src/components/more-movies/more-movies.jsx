import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import PropTypes from "prop-types";
import {getSilimarMovies} from "../../reducer/movie-list-state/selectors.js";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";

const SmallMovieCardWrapped = withTogglePlay(SmallMovieCard);

class MoreMovies extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies} = this.props;

    return (
      <React.Fragment>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <div className="catalog__movies-list">
              {movies.map((film, index) => {
                if (index <= 3) {
                  return <SmallMovieCardWrapped movie={film} key={index} />;
                }
                return null;
              })}
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
      </React.Fragment>
    );
  }
}

MoreMovies.propTypes = {
  movies: PropTypes.arrayOf(
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
};

const mapStateToProps = (state) => ({
  movies: getSilimarMovies(state),
});

export {MoreMovies};
export default connect(mapStateToProps, null)(MoreMovies);
