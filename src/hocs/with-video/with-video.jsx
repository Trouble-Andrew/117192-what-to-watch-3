import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };
    }

    componentDidMount() {
      const {src, forwardedRef} = this.props;
      const video = forwardedRef.current;

      video.src = src;

      video.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

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
      const {forwardedRef} = this.props;
      const video = forwardedRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.src = ``;
    }

    componentDidUpdate() {
      const {forwardedRef} = this.props;
      const video = forwardedRef.current;

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
          forwardedRef={forwardedRef}
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

  return React.forwardRef((props, ref) => {
    return <WithVideo {...props} forwardedRef={ref} />;
  });
};

export default withVideo;
