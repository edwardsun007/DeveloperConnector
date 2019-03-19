// Register User
import { TEST_DISPATCH } from "./types";

export const registerUser = userData => {
  console.log("authActions: userData=", userData);
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
