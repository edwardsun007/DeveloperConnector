import React, { Component } from "react";
import { Link } from "react-router-dom";

import propTypes from "prop-types"; // we need this because we gonna do mapStateToProps
// whenever we have props we need prop-types
import { withRouter } from "react-router-dom"; //
import { connect } from "react-redux"; // redux

class Landing extends Component {
  // for authenticated user, we don't want to see sign up and login show up when they go to /
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // redirect
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">DevCon</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link className="btn btn-lg btn-info mr-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-light" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: propTypes.object.isRequired // auth is object and its required
};

const mapStateToProps = state => ({
  auth: state.auth // auth need to obey the name you set in combine reducer
});

// we don't need actions, so null for dispatch and action, just pull state
export default connect(mapStateToProps)(withRouter(Landing));
