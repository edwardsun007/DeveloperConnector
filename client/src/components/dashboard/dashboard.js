import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  // call it right away
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    // console.dir(this.props.auth);
    if (this.props.profile == undefined) {
      console.log("here");
    }
    const { user } = this.props.auth; // user = this.props.auth.user

    const { profile, loading } = this.props.profile; // profile = this.props.profile.profile

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        // basically if there is property exist in profile
        dashboardContent = <h4>TODO: DISPLAY profile</h4>;
      } else {
        // user logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Wecome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              CREATE PROFILE
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.prototypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
