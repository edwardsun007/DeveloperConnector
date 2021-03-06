import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfileAction } from "../../actions/profileActions";

class createProfile extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  //
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // for interaction its best to create action for it
  onSubmit(e) {
    console.log("onSubmitStarts..");
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
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // destructing
    const { errors, displaySocialInputs } = this.state;

    // initialize it
    let socialInputs;
    // if component state displaySocialinput is true then render socialInputs
    if (displaySocialInputs) {
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
    }

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
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Lets's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
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

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
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

createProfile.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfileAction }
)(withRouter(createProfile));
