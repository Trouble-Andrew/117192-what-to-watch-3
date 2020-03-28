import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getGenre} from "../../reducer/movie-list-state/selectors.js";

class Filter extends PureComponent {

  render() {
    const {handleClickFilter, toggleTab, movies, genre} = this.props;

    const allGenres = getAllGenres(movies);

    return (
      <ul className="catalog__genres-list">
        {allGenres.map((element, index) => {
          if (index <= 9) {
            return <li key={index} className={element === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}>
              <a href="#" className="catalog__genres-link" onClick={(evt) => {
                evt.preventDefault();
                handleClickFilter(evt);
                toggleTab(index);
              }}>{element}</a>
            </li>;
          }
          return null;
        })}
      </ul>
    );
  }
}

const getAllGenres = function (movies) {
  let newArray = [`All genres`];
  movies.forEach((movie) => newArray.push(...movie.genre));

  let unique = newArray.filter((v, i, a) => a.indexOf(v) === i);
  return unique;
};

Filter.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ).isRequired,
  handleClickFilter: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
  toggleTab: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickFilter(type) {
    dispatch(ActionCreator.getSelectedGenre(type.target.innerHTML));
  },
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
