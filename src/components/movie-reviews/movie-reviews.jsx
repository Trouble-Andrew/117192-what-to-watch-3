import React from "react";
import PropTypes from "prop-types";
import MovieReview from "../movie-review/movie-review.jsx";

const MovieReviews = (props) => {
  const {film} = props;

  return <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {film.reviews.map((review, index) =>
        <MovieReview review={review} key={index}/>
      )}
    </div>
  < /div>;
};

MovieReviews.propTypes = {
  film: PropTypes.shape({
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
    reviews: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default MovieReviews;
