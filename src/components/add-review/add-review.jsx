import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import history from "../../history.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFormDisable = this._handleFormDisable.bind(this);
    this._handleFormSuccess = this._handleFormSuccess.bind(this);
    this._handleFormFail = this._handleFormFail.bind(this);
  }

  componentDidMount() {
    this._firstLoad = true;
  }

  componentWillUnmount() {
    this._firstLoad = false;
  }

  _handleFormDisable() {
    const postButton = document.querySelector(`.add-review__btn`);
    postButton.disabled = true;
  }

  _handleFormSuccess() {
    history.goBack();
  }

  _handleFormFail() {
    const postForm = document.querySelector(`.add-review__text`);
    postForm.style.background = `#f75555`;
  }

  render() {
    const {
      movies,
      user,
      handleChangeInput,
      handleClickSubmit,
      comment,
      rating,
      handleMovieLoad,
      isActive,
      match
    } = this.props;

    const movieID = match.params.number - 1;

    if (this._firstLoad) {
      handleMovieLoad(movies, parseInt(match.params.number, 10));
      this._firstLoad = false;
    }

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movies[movieID].poster} alt={movies[movieID].title} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header">
            <div className="logo">
              <Link
                className="logo__link"
                to={AppRoute.ROOT}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link" onClick={(evt) => {
                    evt.preventDefault();
                    return history.goBack();
                  }}>{movies[movieID].title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
            <div className="user-block">
              <div className="user-block__avatar">
                <Link
                  to={AppRoute.MY_LIST}
                >
                  <img src={user.avatar} alt="User avatar" width="63" height="63"/>
                </Link>
              </div>
            </div>
          </header>
          <div className="movie-card__poster movie-card__poster--small">
            <img src={movies[movieID].poster} alt={`${movies[movieID].title} poster`} width={218} height={327} />
          </div>
        </div>
        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" defaultValue={1} onChange={handleChangeInput} />
                <label className="rating__label" htmlFor="star-1">Rating 1</label>
                <input className="rating__input" id="star-2" type="radio" name="rating" defaultValue={2} onChange={handleChangeInput} />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>
                <input className="rating__input" id="star-3" type="radio" name="rating" defaultValue={3} onChange={handleChangeInput} defaultChecked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>
                <input className="rating__input" id="star-4" type="radio" name="rating" defaultValue={4} onChange={handleChangeInput} />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>
                <input className="rating__input" id="star-5" type="radio" name="rating" defaultValue={5} onChange={handleChangeInput} />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>
            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={``} onChange={handleChangeInput} />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={!isActive} onClick={(evt) => {
                  evt.preventDefault();
                  handleClickSubmit(movies[movieID], {
                    rating: parseInt(rating, 10),
                    comment,
                  },
                  this._handleFormDisable,
                  this._handleFormSuccess,
                  this._handleFormFail);
                }}>Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genre: PropTypes.array.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        director: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleClickSubmit: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  match: PropTypes.any.isRequired,
  handleMovieLoad: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleClickSubmit(movie, review, funcSubmit, funcSuccess, funcFail) {
    dispatch(DataOperation.submitReview(movie.id, review, funcSubmit, funcSuccess, funcFail));
  },
  handleMovieLoad(movies, id) {
    dispatch(ActionCreator.getSelectedMovie(movies[id - 1]));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
