import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import MyList from "../my-list/my-list.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore();

const user = {
  id: 1,
  email: `gg@mail.com`,
  name: `gg`,
  avatar: `https://htmlacademy-react-3.appspot.com//wtw/static/avatar/8.jpg`,
};

it(`MyList is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteMovies: [],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: films[0],
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
          <MyList
            movies={films}
            user={user}
            handleMovieLoads={() => {}}
            stop={true}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
