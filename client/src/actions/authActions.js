// Register User
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  console.log("authActions: userData=", userData);
  axios
    .post("/api/users/register", userData) // returns a promise
    .then(res => history.push("/login")) // we need to redirect back to login page or main page after register
    .catch(err =>
      // once get err from backend, then calls dispatch function to pass the type and payload
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // the payload gonna include json error message from backend, so our errorRuducer simply need to return action.payload
      })
    );
};

// Login - Get Token
export const loginUser = userData => dispatch => {
  console.log("authActions: loginUser starts");
  axios
    .post("/api/user/login", userData)
    .then(res => {
      console.log("user login successfully");
      // once user login success, 1st need to save token to local storage
      const token = res.data.token;
      console.log();
      // so here we set token to local
      localStorage.setItem("jwtToken", token);
      // then we need to set token in Authentication header, we create a separate utility for this
      setAuthToken(token);
      // decode jwt token to access user data
      const decoded = jwt_decode(token);
      // then we dispatch setCurrentUser action to our reducer
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// action setCurrentUser
// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
