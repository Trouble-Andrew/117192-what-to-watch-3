import React, {PureComponent} from "react";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.toggleTab = this.toggleTab.bind(this);

      this.state = {
        tab: 0,
      };
    }

    toggleTab(currentTab) {
      this.setState({tab: currentTab});
    }

    render() {
      const {tab} = this.state;

      return (
        <Component
          {...this.props}
          toggleTab={this.toggleTab}
          tab={tab}
        >
        </Component>
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
