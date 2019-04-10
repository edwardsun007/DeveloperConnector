import { GET_ERRORS } from "../actions/types";

// origin state his profile is null, array of profile is empty
const initialState = {
  profile: null,
  profiles: null,
  loading: false // while fetching profile set loading to true
};
