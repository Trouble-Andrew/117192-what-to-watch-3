import React, {createRef, PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";

const VideoPlayerWrapped = withVideo(VideoPlayer);

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this._setTimer = this._setTimer.bind(this);

    this.timer = null;

    this.state = {
      isVideo: false,
      isPlaying: true,
    };
  }

  _setTimer() {
    this.timer = setTimeout(() => {
      this.setState({isVideo: !this.state.isVideo});
    }, 1000);
  }

  _clearTimer() {
    this.setState({isVideo: false});
    clearTimeout(this.timer);
  }

  render() {
    const {movie, handleClickCard} = this.props;

    const {isVideo} = this.state;

    if (isVideo) {
      return <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        this._clearTimer();
      }}
      onMouseLeave={() => {
        this.setState({isVideo: false});
        this._clearTimer();
      }}
      >
        <VideoPlayerWrapped
          isPlaying={true}
          src={movie.video}
          ref={this._videoRef}
        />
      </article>;
    }

    return (
      <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
        evt.preventDefault();
        handleClickCard(movie);
        this._clearTimer();
      }}
      onMouseEnter = {this._setTimer}

      onMouseLeave={() => {
        this._clearTimer();
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
};

const mapDispatchToProps = (dispatch) => ({
  handleClickCard(movie) {
    dispatch(ActionCreator.getSelectedMovie(movie));
  },
});

export {SmallMovieCard};
export default connect(null, mapDispatchToProps)(SmallMovieCard);
