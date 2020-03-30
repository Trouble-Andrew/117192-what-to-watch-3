import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import history from "../../history.js";

import {ActionCreator} from "../../reducer/movie-list-state/movie-list-state.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getActiveMovie} from "../../reducer/movie-list-state/selectors.js";

class VideoPlayerFull extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this._fullScreen = this._fullScreen.bind(this);
  }

  _fullScreen() {
    const player = document.querySelector(`.player`);

    if (document.fullscreenElement === player) {
      document.exitFullscreen();
    }

    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitrequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.mozRequestFullscreen) {
      player.mozRequestFullScreen();
    }
  }


  componentDidMount() {
    const {match, startPlay, stopPlay, update, movies, handleMovieLoad} = this.props;
    const video = this._videoRef.current;

    const movieID = match.params.number - 1;

    handleMovieLoad(movies, parseInt(match.params.number, 10));

    video.src = movies[movieID].video;

    if (history.location.key !== undefined) {
      video.oncanplaythrough = () => startPlay();
    }

    video.onplay = () => startPlay();

    video.onpause = () => stopPlay();

    video.ontimeupdate = () => update(video);
  }

  componentDidUpdate() {
    const {isPlay} = this.props;

    const video = this._videoRef.current;

    if (isPlay) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    const {togglePlay, isPlay, match, timeLeft, progress, duration, movies} = this.props;
    const timeLeftInPercent = Number((progress / Math.floor(duration) * 100).toFixed(1));
    const movieID = match.params.number - 1;
    return (
      <div className="player">
        <video ref={this._videoRef} className="player__video" poster={movies[movieID].posterBig} />
        <button type="button" className="player__exit" onClick={() => {
          return history.location.key === undefined ? history.push(`/films/${match.params.number}`) : history.goBack();
        }}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={isNaN(timeLeftInPercent) ? 0 : timeLeftInPercent} max={100} />
              <div className="player__toggler" style={{left: `${isNaN(timeLeftInPercent) ? 0 : timeLeftInPercent}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={() => togglePlay()}>
              {isPlay ||
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </React.Fragment>
              }
              {isPlay &&
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width={14} height={21}>
                    <use xlinkHref="#pause" />
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
              }
            </button>
            <div className="player__name">{movies[movieID].title}</div>
            <button type="button" className="player__full-screen" onClick={this._fullScreen}>
              <svg viewBox="0 0 27 27" width={27} height={27}>
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayerFull.propTypes = {
  isPlay: PropTypes.bool.isRequired,
  startPlay: PropTypes.func.isRequired,
  stopPlay: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  timeLeft: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        poster: PropTypes.string.isRequired,
        posterBig: PropTypes.string.isRequired,
        video: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        directors: PropTypes.array.isRequired,
        stars: PropTypes.array.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  handleMovieLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  movie: getActiveMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieLoad(movies, id) {
    dispatch(ActionCreator.getSelectedMovie(movies[id - 1]));
  },
});

export {VideoPlayerFull};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerFull);
