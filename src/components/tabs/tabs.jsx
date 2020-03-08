import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";

const TABS = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

function TabsContent({activeTab, film}) {
  switch (activeTab) {
    case TABS.OVERVIEW:
      return <MovieOverview film={film} />;

    case TABS.DETAILS:
      return <MovieDetails film={film} />;

    case TABS.REVIEWS:
      return <MovieReviews film={film} />;
  }
  return null;
}

class Tabs extends PureComponent {

  render() {
    const {film, tab, toggleTab} = this.props;
    const tabs = [`Overview`, `Details`, `Reviews`];

    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list" >
            {tabs.map((element, index) =>
              <li key={index} className={tab === index ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  toggleTab(index);
                }}>{element}</a>
              </li>
            )}
          </ul>
        </nav>
        <TabsContent film={film} activeTab={tabs[tab]}/>
      </React.Fragment>
    );
  }
}

Tabs.propTypes = {
  tab: PropTypes.number.isRequired,
  toggleTab: PropTypes.func.isRequired,
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

TabsContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
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

export default Tabs;
