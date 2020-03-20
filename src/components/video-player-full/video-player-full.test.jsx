import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from "redux-mock-store";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`VideoPlayerFull is rendered correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    activeMovie: {},
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
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
