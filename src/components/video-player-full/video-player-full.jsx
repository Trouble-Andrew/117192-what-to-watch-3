import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayerFull extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {src, startPlay, stopPlay} = this.props;
    const video = this._videoRef.current;

    video.src = src;

    video.oncanplaythrough = () => startPlay();

    video.onplay = () => startPlay();

    video.onpause = () => stopPlay();
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
    const {togglePlay} = this.props;

    return (
      <div className="player">
        <video ref={this._videoRef} className="player__video" poster="img/player-poster.jpg" />
        <button type="button" className="player__exit">Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={30} max={100} />
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={() => togglePlay()}>
              <svg viewBox="0 0 19 19" width={19} height={19}>
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>
            <button type="button" className="player__full-screen">
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
  src: PropTypes.string.isRequired,
};

export default VideoPlayerFull;
