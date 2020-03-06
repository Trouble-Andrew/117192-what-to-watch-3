import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

class Filter extends PureComponent {

  render() {
    const {allGenres, handleClickFilter, tab, toggleTab} = this.props;

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

const getAllGenres = function (films) {
  let newArray = [`All genres`];
  films.forEach((film) => newArray.push(...film.genre));

  let unique = newArray.filter((v, i, a) => a.indexOf(v) === i);
  return unique;
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
  handleClickFilter: PropTypes.func.isRequired,
  allGenres: PropTypes.array.isRequired,
  tab: PropTypes.number.isRequired,
  toggleTab: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  genre: state.genre,
  allGenres: getAllGenres(state.films),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickFilter(type) {
    dispatch(ActionCreator.getFiltededList(type.target.innerHTML));
  },
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
