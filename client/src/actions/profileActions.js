import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// GET current profile
export const getCurrentProfile = () => dispatch => {
  // call another action called setProfileLoading
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      console.dir(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    // if there is err, we simplay dispatch an empty profile instead of errors
    // because user can create account with no profile
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create New Profile Action
// history for redirect
export const createProfileAction = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// **** Delete account action ****
// This actually delete both the user and its profile from mongoDB backend
// the delete profile backend actually find the profile delete it and then find the user remove it so it does both for us
export const deleteAccount = history => dispatch => {
  // confirmation window
  if (
    window.confirm(
      "Are you sure you want delete your account? This can NOT be undo!"
    )
  ) {
    axios
      .delete("/api/profile")
      .then(res => {
        console.dir(res);
        // now its deleted so it would not make sense to have a logged in user that doesn't exist
        // so we call setCurrentUser and pass a empty payload for
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Set Profile Loding
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
