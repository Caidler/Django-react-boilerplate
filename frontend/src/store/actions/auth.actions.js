import * as actionTypes from "./action.types";

import {
  alert
} from "./alert.actions";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/accounts/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const access_token = res.data.access_token;
        const refresh_token = res.data.refresh_token;
        const user = res.data.user;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(access_token));
        dispatch(checkAuthTimeout(3600));
        dispatch(alert.alertNormal("Zalogowano", 2));
      })
      .catch((err) => {
        dispatch(authFail(err));
        dispatch(alert.alertNormal(String(err), 2));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/accounts/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const access_token = res.data.access_token;
        const refresh_token = res.data.refresh_token;
        const user = res.data.user;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(access_token));
        dispatch(checkAuthTimeout(3600));
        dispatch(alert.alertNormal("Utworzono konto " + username, 2));
      })
      .catch((err) => {
        dispatch(authFail(err));
        dispatch(alert.alertNormal(String(err), 2));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};