import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

const params = {
  number: `1`,
};

it(`VideoPlayerFull is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
      comments: [],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: {},
      genre: films[0].genres[0],
    },
  });

  const location = {
    linkProp: {
      movie: films[0],
    },
  };

  const tree = renderer.create(
      <Router
        history={history}
      >
        <Provider store={store}>
          <VideoPlayerFull
            isPlay={true}
            location={location}
            startPlay={() => {}}
            stopPlay={() => {}}
            togglePlay={() => {}}
            update={() => {}}
            progress={0}
            duration={0}
            match={{params}}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
