import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import SignIn from "./sign-in.jsx";

const mockStore = configureStore([]);

configure({adapter: new Adapter()});

describe(`SignIn component work correctly`, () => {
  const store = mockStore({
  });

  it(`If state isValid prop is false show error message`, () => {
    const signInComponent = mount(
        <Router
          history={history}
        >
          <Provider store={store}>
            <SignIn
              valid={() => {}}
              invalid={() => {}}
              fail={() => {}}
              isValid={false}
              submitFail={false}
            />
          </Provider>
        </Router>
    );

    signInComponent.setProps({isValid: false});

    expect(signInComponent.find(`.sign-in__message`).text()).toEqual(`Please enter a valid email address`);
  });
});
