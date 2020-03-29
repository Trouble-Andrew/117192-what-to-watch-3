import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import AddReview from "./add-review.jsx";
import films from "../../mocks/films.js";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

const user = {
  id: 1,
  email: `gg@mail.com`,
  name: `gg`,
  avatar: `https://htmlacademy-react-3.appspot.com//wtw/static/avatar/8.jpg`,
};

const params = {
  number: `1`,
};

configure({adapter: new Adapter()});

describe(`AddReview component work correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
      comments: [],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: {},
      genre: films[0].genre[0],
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user,
    },
  });

  it(`If state isActive true review button is enable`, () => {
    const addReviewComponent = mount(
        <Router
          history={history}
        >
          <Provider store={store}>
            <AddReview
              movies={films}
              tab={0}
              handleInputChange={() => {}}
              handleSubmitClick={() => {}}
              match={{params}}
              user={user}
              rating={`5`}
              isActive={true}
              comment={`comment`}
            />
          </Provider>
        </Router>
    );
    expect(addReviewComponent.find(`.add-review__btn`).prop(`disabled`)).toEqual(false);
  });

  it(`If state isActive false review button is disable`, () => {
    const addReviewComponent = mount(
        <Router
          history={history}
        >
          <Provider store={store}>
            <AddReview
              movies={films}
              tab={0}
              handleInputChange={() => {}}
              handleSubmitClick={() => {}}
              match={{params}}
              user={user}
              rating={`5`}
              isActive={false}
              comment={`comment`}
            />
          </Provider>
        </Router>
    );
    expect(addReviewComponent.find(`.add-review__btn`).prop(`disabled`)).toEqual(true);
  });
});
