import React, {PureComponent} from "react";

const withFormValue = (Component) => {
  class WithFormValue extends PureComponent {
    constructor(props) {
      super(props);

      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {
        comment: ``,
        rating: `3`,
        isActive: false,
      };
    }

    handleInputChange(evt) {
      const minTextLength = 50;
      const maxTextLength = 400;
      const target = evt.target;
      let value;
      let name;

      if (target.name === `review-text`) {
        name = `comment`;
      } else if (target.name === `rating`) {
        name = `rating`;
      }

      value = evt.target.value;

      this.setState({
        [name]: value,
      });

      if (this.state.comment.length > minTextLength & this.state.comment.length < maxTextLength) {
        this.setState({
          isActive: true,
        });
      } else {
        this.setState({
          isActive: false,
        });
      }
    }


    render() {
      const {comment, rating, isActive} = this.state;

      return (
        <Component
          {...this.props}
          comment={comment}
          rating={rating}
          handleInputChange={this.handleInputChange}
          isActive={isActive}
        >
        </Component>
      );
    }
  }

  return WithFormValue;
};

export default withFormValue;
