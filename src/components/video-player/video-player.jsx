import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {
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

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
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
    const {poster} = this.props;

    return (
      <Fragment>
        <video ref={this._videoRef} className="player__video" poster={poster} muted />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  startPlay: PropTypes.func.isRequired,
  stopPlay: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
