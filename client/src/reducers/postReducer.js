import { ADD_POST, GET_POSTS, POST_LOADING } from "../actions/types";

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
    default:
      return state;
  }
};
