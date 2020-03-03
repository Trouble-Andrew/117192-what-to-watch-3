import React, {PureComponent} from "react";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this._toggleTab = this._toggleTab.bind(this);

      this.state = {
        tab: `Overview`,
      };
    }

    _toggleTab(currentTab) {
      switch (true) {
        case currentTab === `Overview`:
          this.setState({tab: currentTab});
          break;
        case currentTab === `Details`:
          this.setState({tab: currentTab});
          break;
        case currentTab === `Reviews`:
          this.setState({tab: currentTab});
          break;
      }
    }

    render() {
      const {tab} = this.state;

      return (
        <Component
          {...this.props}
          toggleTab={this._toggleTab}
          tab={tab}
        >
        </Component>
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
