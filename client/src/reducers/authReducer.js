import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/is-Empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

/* Here, we do not mutate the original state, instead we made a copy of it, by assigning it to variable called
state,
initialState is the preloaded state */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    // remember setCurrentUser action's payload is decoded token that has user info in it

    default:
      return state;
  }
}
