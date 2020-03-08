import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MovieReview extends PureComponent {

  render() {
    const {review} = this.props;

    return (
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">{review.text}</p>
          <footer className="review__details">
            <cite className="review__author">{review.author}</cite>
            <time className="review__date" dateTime="2016-12-24">{review.date}</time>
          </footer>
        </blockquote>
        <div className="review__rating">{review.rating}</div>
      </div>
    );
  }
}

MovieReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieReview;
