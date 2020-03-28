import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

const user = {
  id: 1,
  email: `gg@mail.com`,
  name: `gg`,
  avatar: `https://htmlacademy-react-3.appspot.com//wtw/static/avatar/8.jpg`,
};

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
      dataFetching: false,
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

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
