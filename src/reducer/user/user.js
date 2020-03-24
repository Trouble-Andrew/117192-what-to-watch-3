import {extend} from "../../utils.js";
import UserInfoAdapter from "../../adapters/user-info-adapter.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
  userFetching: true,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_USER_INFORMATION: `LOAD_USER_INFORMATION`,
  USER_FETCHING_SUCCESS: `USER_FETCHING_SUCCESS`,
  USER_FETCHING_START: `USER_FETCHING_START`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  loadUserInformation: (data) => {
    return {
      type: ActionType.LOAD_USER_INFORMATION,
      payload: data,
    };
  },
  userFetchingSuccess: () => {
    return {
      type: ActionType.USER_FETCHING_SUCCESS,
      payload: false,
    };
  },
  userFetchingStart: () => {
    return {
      type: ActionType.USER_FETCHING_START,
      payload: true,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadUserInformation(UserInfoAdapter.parseElement(response.data)));
        dispatch(ActionCreator.userFetchingSuccess());
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadUserInformation(UserInfoAdapter.parseElement(response.data)));
        dispatch(ActionCreator.userFetchingSuccess());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.LOAD_USER_INFORMATION:
      return extend(state, {
        user: action.payload,
      });
    case ActionType.USER_FETCHING_SUCCESS:
      return extend(state, {
        userFetching: action.payload,
      });
    case ActionType.USER_FETCHING_START:
      return extend(state, {
        userFetching: action.payload,
      });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
