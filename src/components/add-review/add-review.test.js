import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import AddReview from "./add-review.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import films from "../../mocks/films.js";
import history from "../../history.js";

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

it(`AddReview is rendered correctly`, () => {
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

  const tree = renderer.create(
      <Router
        history={history}
      >
        <Provider store={store}>
          <AddReview
            movies={films}
            tab={0}
            handleChangeInput={() => {}}
            handleClickSubmit={() => {}}
            match={{params}}
            user={user}
            rating={`5`}
            isActive={true}
            comment={`comment`}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
