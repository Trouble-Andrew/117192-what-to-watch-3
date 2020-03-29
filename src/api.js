import axios from "axios";
import {Errors} from "./const.js";

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const serverError = () => {
    const div = document.createElement(`div`);
    const root = document.querySelector(`#root`);
    div.innerHTML = `ОШИБКА СЕРВЕРА 500`;
    root.appendChild(div);
  };

  const onSuccess = (response) => {

    if (response.status === Errors.SERVER_ERROR) {
      serverError();
    }

    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Errors.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    if (response.status === Errors.SERVER_ERROR) {
      serverError();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
