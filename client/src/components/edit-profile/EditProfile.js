import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createProfileAction,
  getCurrentProfile
} from "../../actions/profileActions";
import isEmpty from "../../validations/is-Empty";

class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubname: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    // bind this
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // the first thing we want is to get user's current profile, this happens as soon as the this component mounted
  componentDidMount() {
    console.log("edit -> componentDidMount started...");
    this.props.getCurrentProfile();
  }

  // 1. if there is error from user input, this method will receive new error state and then setState
  // 2. this function will also retrieve profile object from redux state and set them for each input field
  componentWillReceiveProps(nextProps) {
    console.log("edit-> componentsReceivedProps receive props...");
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // check if the profile was from state because
    // exist profile comes from state
    // nextProps.profile -- profile state  .profile.profile -- profile object inside profile state
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // Bring skills array into a csv string
      const skillsCSV = profile.skills.join(","); // rebuilt the string
      console.log(`skillsCSV=${skillsCSV}`);
      // if user doesn't have profile it will be empty so use validator here
      // if profile field doesn't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";

      profile.githubname = !isEmpty(profile.githubname)
        ? profile.githubname
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedIn = !isEmpty(profile.social.linkedIn)
        ? profile.social.linkedIn
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubname: profile.githubname,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedIn: profile.linkedIn,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  // for interaction its best to create action for it
  onSave(e) {
    console.log("edit -> onSave started..");
    e.preventDefault();

    // create a object that has the latest component state of each input
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubname: this.state.githubname,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    // call action pass in the obj
    console.log("calling createProfileAction");
    this.props.createProfileAction(profileData, this.props.history);
  }

  onChange(e) {
    console.log("edit->onChange called...");
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // destructing
    const { errors, displaySocialInputs } = this.state;

    // initialize it
    let socialInputs;
    // if component state displaySocialinput is true then render socialInputs
    // if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="linkedIn Profile URL"
          name="linkedIn"
          icon="fab fa-linkedin"
          value={this.state.linkedIn}
          onChange={this.onChange}
          error={errors.linkedIn}
        />

        <InputGroup
          placeholder="Youtube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
        />
      </div>
    );
    //}

    // select options for status
    const options = [
      {
        label: "select professional status",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "QA",
        value: "QA"
      },
      {
        label: "Engineer Manager",
        value: "Engineer Manager"
      },
      {
        label: "Tech Lead",
        value: "Tech Lead"
      },
      {
        label: "PM",
        value: "PM"
      },
      {
        label: "Director",
        value: "Director"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "IT",
        value: "IT"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];

    // textArea rows
    const rows = 6;

    return (
      // onSubmit={this.onSubmit}
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back To Dashboard
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                Save your changes before leaving this page
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (THIS Can't be changed later)"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Please tell us about your role and level in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your own company or one you currently are working for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your website or your company's website"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, Javascript, PHP)"
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubname"
                  value={this.state.githubname}
                  onChange={this.onChange}
                  error={errors.githubname}
                  info="If you want DevCon show your latest repos and github link, include your username here"
                />

                <TextAreaFieldGroup
                  placeholder="Your Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  rows={rows}
                  info="Tell us a bit about yourself"
                />

                <div className="mb-4">
                  <h3>Edit Social Network links</h3>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}

                <input
                  type="submit"
                  value="Save"
                  onClick={this.onSave}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } // the button's purpose is toggle displaySocialInput's from true to false
}

editProfile.propTypes = {
  createProfileAction: propTypes.func.isRequired,
  getCurrentProfile: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfileAction, getCurrentProfile }
)(withRouter(editProfile));
