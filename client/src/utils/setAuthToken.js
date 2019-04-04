import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply the token to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // token is not there, then delete authorization headers
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
