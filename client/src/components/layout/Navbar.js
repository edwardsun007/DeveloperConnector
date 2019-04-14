import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux"; // anything that need be updated corresponding to state requires Redux period.
import { logoutUser } from "../../actions/authActions"; // we need to import the actions
import { clearCurrentProfile } from "../../actions/profileActions"; // actions need to be dispatched thru reducer

class Navbar extends Component {
  // we need to call clearProfile action itself before logoutUser action
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    // PULL off isAuthenticated, user from auth state
    const { isAuthenticated, user } = this.props.auth;

    // this is how I do it:  authenticated user will see authLinks--postFeed, DashBoard, logout
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a onClick={this.onLogoutClick.bind(this)} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "40px", marginRight: "20px" }}
              title="You must have a Gravatar enabled Email account to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    ); // the JSX here is a tag but it won't be a link instead it will just trigger click handler above

    // guest user only see guestLinks
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevCon
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

// actions
Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  clearCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// you need to include all action you needed for component put in the mapDispatchToProps argument
// and you need mapStateToProps if you component need receive dynamic state / redux state / data will change
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
