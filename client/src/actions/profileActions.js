import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

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
