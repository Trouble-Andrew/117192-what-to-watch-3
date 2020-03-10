import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";

const SmallMovieCardWrapped = withTogglePlay(SmallMovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies} = this.props;

    return (

      <div className="catalog__movies-list">
        {movies.map((film, index) => (
          <SmallMovieCardWrapped movie={film} key={index}/>
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
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
};

export default MovieList;
