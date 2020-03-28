import React, {PureComponent} from "react";

const withFormValue = (Component) => {
  class WithFormValue extends PureComponent {
    constructor(props) {
      super(props);

      this.handleChangeInput = this.handleChangeInput.bind(this);

      this.state = {
        comment: ``,
        rating: `3`,
        isActive: false,
      };
    }

    handleChangeInput(evt) {
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

      if (this.state.comment.length > 50 & this.state.comment.length < 400) {
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
          handleChangeInput={this.handleChangeInput}
          isActive={isActive}
        >
        </Component>
      );
    }
  }

  return WithFormValue;
};

export default withFormValue;
