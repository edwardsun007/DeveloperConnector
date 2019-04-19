import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions"; // clear Profile action
import { Provider } from "react-redux"; // redux stuff
import store from "./store";
import Navbar from "./components/layout/Navbar"; // Navbar component
import Footer from "./components/layout/Footer"; // footer component
import Landing from "./components/layout/Landing"; // landing component
import Register from "./components/auth/Register"; // signup component
import Login from "./components/auth/Login"; // login component
import Dashboard from "./components/dashboard/dashboard"; // dashboard component
import CreateProfile from "./components/create-profile/createProfile"; // for create new profile
import EditProfile from "./components/edit-profile/EditProfile"; // for edit existing profile
import AddExperience from "./components/add-experience/AddExperience"; // add experience
import AddEducation from "./components/add-education/AddEducation";
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

// check for token if it exists in local storage
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // then we want to decode the existing token we have
  const decoded = jwt_decode(localStorage.jwtToken);

  // either get expiration ts, if its not expired then we need to set isAuthenticated as true

  // or simply authenticate the user if local cached a token already
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout since its expired
    store.dispatch(logoutUser());
    // also clear profile since it expired same thing you do when you logout user
    store.dispatch(clearCurrentProfile());
    // Clear current Profile
    window.location.href = "/login"; // vanilla javascript way to redirect to URL
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
