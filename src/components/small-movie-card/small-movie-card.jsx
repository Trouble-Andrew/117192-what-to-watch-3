import React from "react";
import PropTypes from "prop-types";


const SmallMovieCard = (props) => {
  const {movie, handleMouseEnterCard} = props;

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={(evt) => {
      evt.preventDefault();
      handleMouseEnterCard(movie);
    }}>
      <div className="small-movie-card__image">
        <img src={movie.poster} alt={movie.title} width={280} height={175} />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  handleMouseEnterCard: PropTypes.func.isRequired,
};


export default SmallMovieCard;
