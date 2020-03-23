import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import history from "../../history.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie, user, handleClickUser, handleChangeInput, handleClickSubmit, comment, rating} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.poster} alt={movie.title} />
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
                  }}>{movie.title}</a>
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
                  onClick={handleClickUser}
                >
                  <img src={user.avatar} alt="User avatar" width="63" height="63"/>
                </Link>
              </div>
            </div>
          </header>
          <div className="movie-card__poster movie-card__poster--small">
            <img src={movie.poster} alt={`${movie.title} poster`} width={218} height={327} />
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
                <button className="add-review__btn" type="submit" onClick={(evt) => {
                  evt.preventDefault();

                  handleClickSubmit(movie, {
                    rating: parseInt(rating, 10),
                    comment,
                  });
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
  movie: PropTypes.shape({
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
    preview: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleClickUser: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

// export default AddReview;

const mapDispatchToProps = (dispatch) => ({
  handleClickSubmit(movie, review) {
    dispatch(DataOperation.submitReview(movie.id, review));
  },
});

export {AddReview};
export default connect(null, mapDispatchToProps)(AddReview);
