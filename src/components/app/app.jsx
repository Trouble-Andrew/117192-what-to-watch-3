import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

// const handleMouseEnterCard = (item) => {
//   console.log(item);
//   this.setState({
//     screen: item,
//   });
//   console.log(this.state.screen);
// };

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: {},
    };
  }

  _handleMouseEnterCard(item) {
    console.log(item);

    // this.setState({
    //   screen: 0,
    // });
  }

  _renderScreen() {
    const {movieData, films} = this.props;

    if ((Object.entries(this.state.screen)).length === 0) {
      return (
        <Main movieData={movieData} films={films} handleMouseEnterCard={this._handleMouseEnterCard} />
      );
    } else {
      return (
        <MoviePage film={films[0]} />
      );
    }
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/movie-page">
            {this._renderScreen()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

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
        genre: PropTypes.array.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default App;
