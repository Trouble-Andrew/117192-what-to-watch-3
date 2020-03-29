import React, {PureComponent} from "react";
import {convertSeconds} from "../../utils.js";

const withTogglePlay = (Component) => {
  class WithTogglePlay extends PureComponent {
    constructor(props) {
      super(props);

      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.toggle = this.toggle.bind(this);
      this.update = this.update.bind(this);
      this._isMounted = false;

      this.state = {
        isPlay: false,
        progress: 0,
        duration: 0,
        timeLeft: 0,
      };
    }

    start() {
      this.setState({
        isPlay: true,
      });
    }

    stop() {
      this.setState({
        isPlay: false,
      });
    }

    toggle() {
      this.setState({
        isPlay: !this.state.isPlay,
      });
    }

    update(video) {
      this.setState({
        progress: Math.floor(video.currentTime),
        timeLeft: convertSeconds(video.duration - Math.floor(video.currentTime)),
        duration: video.duration,
      });
    }

    render() {
      const {isPlay, progress, duration, timeLeft} = this.state;

      return (
        <Component
          {...this.props}
          startPlay={this.start}
          stopPlay={this.stop}
          togglePlay={this.toggle}
          update={this.update}
          isPlay={isPlay}
          progress={progress}
          duration={duration}
          timeLeft={timeLeft}
        >
        </Component>
      );
    }
  }

  return WithTogglePlay;
};

export default withTogglePlay;
