import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const handleMouseEnterCard = () => {};

const App = (props) => {
  const {movieData, films} = props;

  return (
    <Main movieData={movieData} films={films} handleMouseEnterCard={handleMouseEnterCard} />
  );
};

App.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default App;
