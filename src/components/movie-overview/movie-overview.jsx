import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MovieOverview extends PureComponent {

  _ratingToText(rating) {
    let text;
    switch (true) {
      case rating > 0 && rating < 3:
        text = `Bad`;
        break;
      case rating >= 3 && rating < 5:
        text = `Normal`;
        break;
      case rating >= 5 && rating < 8:
        text = `Good`;
        break;
      case rating >= 8 && rating < 10:
        text = `Very Good`;
        break;
      case rating >= 10:
        text = `Awesome`;
        break;
    }
    return text;
  }

  render() {
    const {movie} = this.props;
    const {
      rating,
      ratingCount,
      director,
      stars,
      preview,
    } = movie;

    return (
      <React.Fragment>
        <div className="movie-rating">
          <div className="movie-rating__score">{rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{this._ratingToText(rating)}</span>
            <span className="movie-rating__count">{ratingCount} ratings</span>
          </p>
        </div>
        <div className="movie-card__text">
          <p>{preview}</p>
          <p className="movie-card__director"><strong>Director: {director}</strong></p>
          <p className="movie-card__starring"><strong>Starring: {stars.join(`, `)} and other</strong></p>
        </div>
      </React.Fragment>
    );
  }
}

MovieOverview.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
};

export default MovieOverview;
