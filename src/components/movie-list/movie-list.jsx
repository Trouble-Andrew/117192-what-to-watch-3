import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films} = this.props;

    return (

      <div className="catalog__movies-list">
        {films.map((film, index) => (
          <SmallMovieCard movie={film} key={index}/>
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
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
};

export default MovieList;
