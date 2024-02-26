// actions.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUPSUCCESS, SIGNUPFAIL, SIGNUPREQUEST, FETCHALLUSER } from "../Constants/Constant";
import axios from "axios";
import { API } from "./api";
// import { useHis } from "react-router-dom";
// const navigate = useNavigation();
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (responseData) => ({
  type: LOGIN_SUCCESS,
  payload: { responseData },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const signUpSuccess = (responseData) => ({
  type: SIGNUPSUCCESS,
  payload: { responseData },
});
export const signUpRequest = () => ({
  type: SIGNUPREQUEST,
});
export const signUpFail = () => ({
  type: SIGNUPFAIL,
});

export const fetchAllUsers = (responseData) => ({
  type: FETCHALLUSER,
  payload: { responseData },
});

export const login = (userEmail, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post(
        API + "/login",
        {
          userEmail,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Setting the Content-Type header
          },
        }
      );
      if (response) {
        var currentUserData = response.data.data;
        localStorage.setItem("Profile", JSON.stringify(currentUserData));
        const currentTime = Date.now();
        var expiryTime = currentTime + 3600000; // 3600000 milliseconds = 1 hour
        localStorage.setItem("ExpiryTime", JSON.stringify(expiryTime));
        dispatch(loginSuccess(response));
        // if (isAdmin) {
        //   localStorage.setItem("isAdmin", isAdmin);
        //   dispatch(setAdmin(isAdmin));
        // }
      }
    } catch (error) {
      // Handle error and dispatch failure action
      dispatch(loginFailure());
    }
  };
};

export const singUp = (name, userEmail, password) => {
  return async (dispatch) => {
    try {
      dispatch(signUpRequest());
      const response = await axios.post(
        API + "/signup",
        {
          name,
          userEmail,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Setting the Content-Type header
          },
        }
      );
      if (response.status === 200) {
        dispatch(signUpSuccess(response.data));
      }
    } catch (error) {
      // Handle error and dispatch failure action
      dispatch(signUpFail());
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API + "/getAllUser");
      dispatch(fetchAllUsers(response.data));
    } catch (error) {
      // Handle error and dispatch failure action
      console.log("error", error);
    }
  };
};

export const logoutAction = () => ({
  type: "LOGOUT",
});
