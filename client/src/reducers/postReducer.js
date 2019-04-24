import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  DELETE_COMMENT
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    // get single post
    case GET_POST:
      console.log(action.payload);
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    // get all posts
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts] // use spread operator create new array of posts
        // new post will be added to the beginning of the post arr2ay
      };

    // FrontEnd Deletion need this
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) // payload is id remember, we filter out this id from state.post array
        // new post will be added to the beginning of the post arr2ay
      };

    // We don't really need front end deletion since comments are removed from backend, but
    // still this fixes crash when last comment is removed. keep it
    case DELETE_COMMENT:
      console.log(action.payload);
      return {
        ...state,
        post: state.post
        // state.post.comments.filter(
        //   comment => comment._id !== action.payload
        //)  payload is id remember, we filter out this id from state.post array
        // new post will be added to the beginning of the post arr2ay
      };

    default:
      return state;
  }
};
