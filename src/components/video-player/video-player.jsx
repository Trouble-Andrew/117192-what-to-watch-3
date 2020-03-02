import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {

  render() {
    const {ref} = this.props;

    return (
      <Fragment>
        <video ref={ref} className="player__video" poster="img/player-poster.jpg" muted />
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  ref: PropTypes.object.isRequired,
};

export default VideoPlayer;
