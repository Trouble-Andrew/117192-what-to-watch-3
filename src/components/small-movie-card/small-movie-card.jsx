import React, {createRef, PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";
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

  componentWillUnmount() {
    const {stopPlay} = this.props;
    stopPlay();
    this._clearTimer(stopPlay);
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
    const {
      movie,
      handleCardClick,
      isPlay,
      startPlay,
      stopPlay,
    } = this.props;

    if (isPlay) {
      return <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        handleCardClick(movie);
        this._clearTimer(stopPlay);
        window.scrollTo(0, 0);
      }}
      onMouseLeave={() => {
        stopPlay();
      }}
      >
        <Link to={{pathname: `${AppRoute.MOVIE}/${movie.id}`}}>
          <div className="small-movie-card__image">
            <VideoPlayerWrapped
              isPlaying={isPlay}
              src={movie.video}
              ref={this._videoRef}
              startPlay={startPlay}
              stopPlay={stopPlay}
              poster={movie.posterBig}
            />
          </div>
        </Link>
      </article>;
    }

    return (
      <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        handleCardClick(movie);
        this._clearTimer(stopPlay);
        window.scrollTo(0, 0);
      }}
      onMouseEnter={() => {
        this._setTimer(startPlay);
      }}
      onMouseLeave={() => {
        this._clearTimer(stopPlay);
      }}
      >
        <Link to={{pathname: `${AppRoute.MOVIE}/${movie.id}`}}>
          <div className="small-movie-card__image">
            <img src={movie.poster} alt={movie.title} width={280} height={175} />
          </div>
          <h3 className="small-movie-card__title">
            <p className="small-movie-card__link">{movie.title}</p>
          </h3>
        </Link>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    poster: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    directors: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  stopPlay: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleCardClick(movie) {
    dispatch(ActionCreator.getSelectedMovie(movie));
    dispatch(DataOperation.loadComments(movie.id));
  },
});

export {SmallMovieCard};
export default connect(null, mapDispatchToProps)(SmallMovieCard);
