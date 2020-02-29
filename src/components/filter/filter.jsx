import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

const Filter = (props) => {
  const {films, genre, handleClickFilter} = props;

  const getAllGenres = function () {
    let newArray = [];
    films.forEach((film) => newArray.push(...film.genre));

    let unique = newArray.filter((v, i, a) => a.indexOf(v) === i);
    return unique;
  };

  const allGenres = getAllGenres(films);

  return <ul className="catalog__genres-list">
    <li className={genre === `All genres` ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}>
      <a href="#" className="catalog__genres-link" onClick={handleClickFilter}>All genres</a>
    </li>

    {allGenres.map((element, index) =>
      <li key={index} className={genre === element ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}>
        <a href="#" className="catalog__genres-link" onClick={handleClickFilter}>{element}</a>
      </li>
    )}
  </ul>;
};

Filter.propTypes = {
  films: PropTypes.arrayOf(
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
  genre: PropTypes.string.isRequired,
  handleClickFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickFilter(type) {
    dispatch(ActionCreator.getFiltededList(type.target.innerHTML));
  },
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
