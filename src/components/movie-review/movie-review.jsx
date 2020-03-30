import React from "react";
import PropTypes from "prop-types";

const MovieReview = (props) => {
  const {review} = props;

  const reviewDate = new Date(review.date);
  const date = reviewDate.getUTCDate();
  const year = reviewDate.getFullYear();
  const month = reviewDate.toLocaleString(`en`, {month: `long`});

  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.text}</p>
      <footer className="review__details">
        <cite className="review__author">{review.author}</cite>
        <time className="review__date" dateTime={`${year}-${month}-${date}`}>{`${month} ${date}, ${year}`}</time>
      </footer>
    </blockquote>
    <div className="review__rating">{review.rating}</div>
  </div>;
};

MovieReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieReview;
