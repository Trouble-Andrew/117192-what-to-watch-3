import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {

  render() {
    const {forwardedRef} = this.props;

    return (
      <Fragment>
        <video ref={forwardedRef} className="player__video" poster="img/player-poster.jpg" muted />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  // ref: PropTypes.object.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
};

export default VideoPlayer;
