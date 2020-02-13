import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: [],
    };
  }

  render() {
    const {films} = this.props;

    return (

      <div className="catalog__movies-list">
        {films.map((film, index) => (
          <SmallMovieCard movie={film} handleMouseEnterCard={(activeCard) => {
            this.setState({
              activeMovie: [activeCard],
            });
          }} key={index}/>
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
  })).isRequired,
};


export default MovieList;
