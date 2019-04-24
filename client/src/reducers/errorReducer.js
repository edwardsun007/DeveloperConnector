import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

/* Here, we do not mutate the original state, instead we made a copy of it, by assigning it to variable called
  state,
  initialState is the preloaded state */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case CLEAR_ERRORS: // to clear errors simply return empty object
      return {};

    default:
      return state;
  }
}
