import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Tabs extends PureComponent {

  render() {
    const {tab, handleClickTab} = this.props;
    const tabs = [`Overview`, `Details`, `Reviews`];

    return (
      <ul className="movie-nav__list">
        {tabs.map((element, index) =>
          <li key={index} className={tab === element ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a href="#" className="movie-nav__link" onClick={(evt) => {
              evt.preventDefault();
              handleClickTab(element);
            }}>{element}</a>
          </li>
        )}
      </ul>
    );
  }
}

Tabs.propTypes = {
  tab: PropTypes.string.isRequired,
  handleClickTab: PropTypes.func.isRequired,
};

export default Tabs;
