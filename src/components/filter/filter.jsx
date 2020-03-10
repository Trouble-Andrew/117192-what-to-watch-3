import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/movie-list-utils/movie-list-utils.js";
import {getMovies} from "../../reducer/data/selectors.js";

class Filter extends PureComponent {

  render() {
    const {handleClickFilter, tab, toggleTab, movies} = this.props;

    const allGenres = getAllGenres(movies);

    return (
      <ul className="catalog__genres-list">
        {allGenres.map((element, index) =>
          <li key={index} className={tab === index ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}>
            <a href="#" className="catalog__genres-link" onClick={(evt) => {
              evt.preventDefault();
              handleClickFilter(evt);
              toggleTab(index);
            }}>{element}</a>
          </li>
        )}
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
        genre: PropTypes.array.isRequired,
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
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickFilter(type) {
    dispatch(ActionCreator.getFiltededList(type.target.innerHTML));
  },
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
