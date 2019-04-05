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
        isAuthenticated: !isEmpty(action.payload), // we utilize isEmpty on check payload to change the state isAuthenticated, when its empty object, it will be reseted, so we can implement our logout action in authAction to pass empty object {} to reset it.
        user: action.payload // same way if payload is empty {}, user will also be reseted to its initial state to log us out
      };
    // remember setCurrentUser action's payload is decoded token that has user info in it

    default:
      return state;
  }
}
