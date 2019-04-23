import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./types";
// GET POSTS
export const getPosts = () => dispatch => {
  dispatch(setPostLoading); // inside dispatch method is for reducers, and reducer consume action type
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    // because we are not displaying error on frontend wee don't want dispatch errors
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// ADD POST
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
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

// Delete Post
export const deletePost = id => dispatch => {
  console.log("deletePost Action called");
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      console.log("deletePost action got res:");
      console.dir(res);
      dispatch({
        type: DELETE_POST,
        payload: id // in reducer we want to delete the post locally ??
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
