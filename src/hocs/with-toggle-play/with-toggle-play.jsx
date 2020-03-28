import React, {PureComponent} from "react";

const withTogglePlay = (Component) => {
  class WithTogglePlay extends PureComponent {
    constructor(props) {
      super(props);

      this._start = this._start.bind(this);
      this._stop = this._stop.bind(this);
      this._toggle = this._toggle.bind(this);
      this._isMounted = false;

      this.state = {
        isPlay: false,
      };
    }

    _start() {
      this.setState({
        isPlay: true,
      });
    }

    _stop() {
      this.setState({
        isPlay: false,
      });
    }

    _toggle() {
      this.setState({
        isPlay: !this.state.isPlay,
      });
    }

    render() {
      const {isPlay} = this.state;

      return (
        <Component
          {...this.props}
          startPlay={this._start}
          stopPlay={this._stop}
          togglePlay={this._toggle}
          isPlay={isPlay}
        >
        </Component>
      );
    }
  }

  return WithTogglePlay;
};

export default withTogglePlay;
