import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
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

// GET getProfileByHandle
export const getProfileByHandle = handle => dispatch => {
  // call another action called setProfileLoading
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`) // note its api/profile/handle/:handle
    .then(res => {
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
        payload: null
      })
    );
};

// GET ALL Profiles
export const getProfiles = () => dispatch => {
  // call another action called setProfileLoading
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      // console.dir(res);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    // if there is err, we simplay dispatch an empty profile instead of errors
    // because user can create account with no profile
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null // profile state will be null in reducers
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

// addd Experience Action
export const addExpAction = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// addd Education Action
export const addEduAction = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete experience Action
export const deleteExpAction = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    // we dispatch GET_PROFILE action type to reducer just to get the latest profile after del
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete edu Action
export const deleteEduAction = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    // we dispatch GET_PROFILE action type to reducer just to get the latest profile after del
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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
