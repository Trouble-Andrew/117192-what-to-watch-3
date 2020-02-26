import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tab: `Overview`,
    };
  }

  _ratingToText(rating) {
    let text;
    switch (true) {
      case rating > 0 && rating < 3:
        text = `Bad`;
        break;
      case rating >= 3 && rating < 5:
        text = `Normal`;
        break;
      case rating >= 5 && rating < 8:
        text = `Good`;
        break;
      case rating >= 8 && rating < 10:
        text = `Very Good`;
        break;
      case rating >= 10:
        text = `Awesome`;
        break;
    }
    return text;
  }

  _toggleTab(currentTab) {
    switch (true) {
      case currentTab.innerHTML === `Overview`:
        this.setState({tab: `Overview`});
        break;
      case currentTab.innerHTML === `Details`:
        this.setState({tab: `Details`});
        break;
      case currentTab.innerHTML === `Reviews`:
        this.setState({tab: `Reviews`});
        break;
    }
  }

  render() {

    const {film} = this.props;
    const {
      title,
      date,
      genre,
      poster,
      posterBig,
      rating,
      ratingCount,
      director,
      stars,
      preview,
    } = film;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={posterBig} alt="The Grand Budapest Hotel" />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>
              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
                </div>
              </div>
            </header>
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre.join(`, `)}</span>
                  <span className="movie-card__year">{date}</span>
                </p>
                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width={19} height={19}>
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width={19} height={20}>
                      <use xlinkHref="#add" />
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={poster} alt="The Grand Budapest Hotel poster" width={218} height={327} />
              </div>
              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs tab={this.state.tab} handleClickTab={(tab) => {
                    this._toggleTab(tab);
                  }} />
                </nav>

                {this.state.tab === `Details` ? <MovieDetails film={film} /> : ``}

                {this.state.tab === `Reviews` ? <MovieReviews film={film} /> : ``}

                <div className={this.state.tab === `Overview` ? `movie-rating` : `movie-rating visually-hidden`}>
                  <div className="movie-rating__score">{rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{this._ratingToText(rating)}</span>
                    <span className="movie-rating__count">{ratingCount} ratings</span>
                  </p>
                </div>
                <div className={this.state.tab === `Overview` ? `movie-card__text` : `movie-card__text visually-hidden`}>
                  <p>{preview}</p>
                  <p className="movie-card__director"><strong>Director: {director}</strong></p>
                  <p className="movie-card__starring"><strong>Starring: {stars.join(`, `)} and other</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width={280} height={175} />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
                </h3>
              </article>
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width={280} height={175} />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/macbeth.jpg" alt="Macbeth" width={280} height={175} />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/aviator.jpg" alt="Aviator" width={280} height={175} />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>
          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
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

export default MoviePage;
