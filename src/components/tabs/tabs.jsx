import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getComments} from "../../reducer/data/selectors.js";
import {getActiveMovie} from "../../reducer/movie-list-state/selectors.js";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import {TabLinks} from "../../const.js";

function TabsContent({activeTab, movie}) {
  switch (activeTab) {
    case TabLinks.OVERVIEW:
      return <MovieOverview movie={movie} />;

    case TabLinks.DETAILS:
      return <MovieDetails movie={movie} />;

    case TabLinks.REVIEWS:
      return <MovieReviews movie={movie} />;
  }
  return null;
}

class Tabs extends PureComponent {

  render() {
    const {
      movie,
      tab,
      toggleTab,
      handleTabClick,
    } = this.props;
    const tabs = [TabLinks.OVERVIEW, TabLinks.DETAILS, TabLinks.REVIEWS];

    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list" >
            {tabs.map((element, index) =>
              <li key={index} className={tab === index ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  toggleTab(index);
                  handleTabClick(movie);
                }}>{element}</a>
              </li>
            )}
          </ul>
        </nav>
        <TabsContent movie={movie} activeTab={tabs[tab]}/>
      </React.Fragment>
    );
  }
}

Tabs.propTypes = {
  tab: PropTypes.number.isRequired,
  toggleTab: PropTypes.func.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.shape({
    }),
    PropTypes.string.isRequired,
  ]),
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    poster: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    directors: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
};

TabsContent.propTypes = {
  activeTab: PropTypes.oneOfType([
    PropTypes.shape({
    }),
    PropTypes.string.isRequired,
  ]),
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    poster: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    directors: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getComments(state),
  movie: getActiveMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleTabClick(movie) {
    dispatch(DataOperation.loadComments(movie.id));
  },
});

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
