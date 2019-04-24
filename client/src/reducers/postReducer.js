import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
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

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) // payload is id remember, we filter out this id from state.post array
        // new post will be added to the beginning of the post arr2ay
      };
    default:
      return state;
  }
};
