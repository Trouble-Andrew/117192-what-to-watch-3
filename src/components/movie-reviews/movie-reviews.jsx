import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getComments} from "../../reducer/data/selectors.js";
import MovieReview from "../movie-review/movie-review.jsx";

const MovieReviews = (props) => {
  const {reviews} = props;

  return <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {reviews.map((review, index) =>
        <MovieReview review={review} key={index}/>
      )}
    </div>
  </div>;
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getComments(state),
});

export {MovieReviews};
export default connect(mapStateToProps, null)(MovieReviews);
