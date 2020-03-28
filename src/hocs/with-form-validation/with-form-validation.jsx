import React, {PureComponent} from "react";

const withFormValidation = (Component) => {
  class WithFormValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.valid = this.valid.bind(this);
      this.invalid = this.invalid.bind(this);
      this.fail = this.submitFail.bind(this);
      this.success = this.submitSuccess.bind(this);

      this.state = {
        isValid: true,
        submitFail: false,
      };
    }

    valid() {
      this.setState({
        isValid: true,
      });
    }

    invalid() {
      this.setState({
        isValid: false,
      });
    }

    submitFail() {
      this.setState({
        submitFail: true,
      });
    }

    submitSuccess() {
      this.setState({
        submitFail: false,
      });
    }

    render() {
      const {isValid, submitFail} = this.state;

      return (
        <Component
          {...this.props}
          valid={this.valid}
          invalid={this.invalid}
          success={this.success}
          fail={this.fail}
          isValid={isValid}
          submitFail={submitFail}
        >
        </Component>
      );
    }
  }

  return WithFormValidation;
};

export default withFormValidation;
