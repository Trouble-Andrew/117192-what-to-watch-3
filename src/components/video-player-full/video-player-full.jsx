import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {convertSeconds} from "../../utils.js";
import history from "../../history.js";

class VideoPlayerFull extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this._fullScreen = this._fullScreen.bind(this);

    this.state = {
      progress: 0,
      duration: 0,
    };
  }

  _fullScreen() {
    const video = this._videoRef.current;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitrequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
      video.mozRequestFullScreen();
    }
  }

  componentDidMount() {
    const {location, startPlay, stopPlay} = this.props;
    const video = this._videoRef.current;

    video.src = location.linkProp.movie.video;

    video.oncanplaythrough = () => startPlay();

    video.onplay = () => startPlay();

    video.onpause = () => stopPlay();

    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.currentTime),
      timeLeft: convertSeconds(video.duration - Math.floor(video.currentTime)),
      duration: video.duration,
    });
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
    const {togglePlay, isPlay, location} = this.props;
    const timeLeftInPercent = Number((this.state.progress / Math.floor(this.state.duration) * 100).toFixed(1));

    return (
      <div className="player">
        <video ref={this._videoRef} className="player__video" poster={location.linkProp.movie.posterBig} />
        <button type="button" className="player__exit" onClick={() => {
          return history.goBack();
        }}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={isNaN(timeLeftInPercent) ? 0 : timeLeftInPercent} max={100} />
              <div className="player__toggler" style={{left: `${isNaN(timeLeftInPercent) ? 0 : timeLeftInPercent}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{this.state.timeLeft}</div>
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
            <div className="player__name">{location.linkProp.movie.title}</div>
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

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlay) {
      video.play();
    } else {
      video.pause();
    }
  }
}

VideoPlayerFull.propTypes = {
  isPlay: PropTypes.bool.isRequired,
  startPlay: PropTypes.func.isRequired,
  stopPlay: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  location: PropTypes.shape({
    linkProp: PropTypes.shape({
      movie: PropTypes.shape({
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
        isFavorite: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default VideoPlayerFull;
