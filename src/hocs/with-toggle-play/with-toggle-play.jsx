import React, {PureComponent} from "react";

const withTogglePlay = (Component) => {
  class WithTogglePlay extends PureComponent {
    constructor(props) {
      super(props);

      this._start = this._start.bind(this);
      this._stop = this._stop.bind(this);

      this.state = {
        isPlay: false,
      };
    }

    _start() {
      this.setState({
        isPlay: !this.state.isPlay
      });
    }

    _stop() {
      this.setState({
        isPlay: false
      });
    }

    render() {
      const {isPlay} = this.state;

      return (
        <Component
          {...this.props}
          startPlay={this._start}
          stopPlay={this._stop}
          isPlay={isPlay}
        >
        </Component>
      );
    }
  }

  return WithTogglePlay;
};

export default withTogglePlay;
