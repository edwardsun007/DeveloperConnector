import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

/* we set a default state here for our authReducer is nothing is passed */
export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload // this line grab payload from action file assign it to user object
      };
    // case SET_CURRENT_USER:
    //     return
    default:
      return state;
  }
}
