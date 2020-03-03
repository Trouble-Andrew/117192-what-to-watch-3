import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      // this._videoRef = createRef();
      this._videoRef = props.ref;

      this.state = {
        progress: 0,
        isPlaying: props.isPlaying,
      };
    }

    componentDidMount() {
      const {src} = this.props;

      const video = this._videoRef.current;

      video.src = src;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });

      video.ontimeupdate = () => this.setState({
        progress: video.currentTime
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

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    render() {
      const {isPlaying} = this.state;
      const {forwardedRef} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          ref={forwardedRef}
        >
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({current: PropTypes.any})
    ]),
    ref: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({current: PropTypes.any})
    ]),
  };

  // return WithVideo;
  return React.forwardRef((props, ref) => {
    return <WithVideo {...props} forwardedRef={ref} />;
  });
};

export default withVideo;
