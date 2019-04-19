import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./profileActions";
import Experience from "./Experience";
//import Education from "./Education";

class Dashboard extends Component {
  // call it right away
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  // Delete account click event
  onDeleteClick() {
    this.props.deleteAccount();
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Wecome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/* separate component for add exp and add edu buttons */}
            {/* TODO: exp and education 
            to finish this: we simply need to get profile and education from our component's profile (which comes from redux state)
            and experience is inside the profile object
            */}

            <Experience experience={profile.experience} />
            <div style={{ marginBottom: "60px" }}>
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this)}
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
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
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
