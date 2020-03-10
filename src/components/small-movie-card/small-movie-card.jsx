import React, {createRef, PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/movie-list-utils/movie-list-utils.js";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import withTogglePlay from "../../hocs/with-toggle-play/with-toggle-play.jsx";

const VideoPlayerWrapped = withTogglePlay(VideoPlayer);

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this._setTimer = this._setTimer.bind(this);

    this.timer = null;
  }

  _setTimer(callback) {
    this.timer = setTimeout(() => {
      callback();
    }, 1000);
  }

  _clearTimer(callback) {
    callback();
    clearTimeout(this.timer);
  }

  render() {
    const {movie, handleClickCard, isPlay, startPlay, stopPlay} = this.props;

    if (isPlay) {
      return <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        handleClickCard(movie);
        this._clearTimer(stopPlay);
      }}
      onMouseLeave={() => {
        stopPlay();
      }}
      >
        <VideoPlayerWrapped
          isPlaying={isPlay}
          src={movie.video}
          ref={this._videoRef}
          startPlay={startPlay}
          stopPlay={stopPlay}
        />
      </article>;
    }

    return (
      <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        handleClickCard(movie);
        this._clearTimer(stopPlay);
      }}
      onMouseEnter={() => {
        this._setTimer(startPlay);
      }}
      onMouseLeave={() => {
        this._clearTimer(stopPlay);
      }}
      >
        <div className="small-movie-card__image">
          <img src={movie.poster} alt={movie.title} width={280} height={175} />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
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
  handleClickCard: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  stopPlay: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleClickCard(movie) {
    dispatch(ActionCreator.getSelectedMovie(movie));
  },
});

export {SmallMovieCard};
export default connect(null, mapDispatchToProps)(SmallMovieCard);
