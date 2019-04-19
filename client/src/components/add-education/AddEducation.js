import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux"; // this makes the component a special component called container
import propTypes from "prop-types";
// above is for markup only

// below for freatures
import { addEduAction } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      major: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    // bind this
    this.onChange = this.onChange.bind(this);
    // checkbox
    this.onCheck = this.onCheck.bind(this);
    // submit
    this.onSubmit = this.onSubmit.bind(this);
  }

  //when ever user change input, change the state
  onChange(e) {
    console.log("edit->onChange called...");
    this.setState({ [e.target.name]: e.target.value });
  }

  // check box click toggle this.state.current and also change this.state.disabled
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // submit to add education
  onSubmit(e) {
    e.preventDefault();
    // obtain input eduData from component state!
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      major: this.state.major,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      desription: this.state.description
    };
    // call action to do what -- restful API call
    this.props.addEduAction(eduData, this.props.history);
  }

  render() {
    // destructing to receive error props from redux state
    const { errors } = this.state;

    // textArea rows
    // const rows = 5;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back To Dashboard
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add all school, bootcamp that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  info="School name is required"
                />
                <TextFieldGroup
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  info="Degree is required"
                />
                <TextFieldGroup
                  placeholder="* Major"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  error={errors.major}
                  info="Field of study is required"
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="* From Date"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  info="From Date is required"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To Date"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.current ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Enrolled
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Institution Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the institution"
                />

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
  }
}

AddEducation.propTypes = {
  addEduAction: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEduAction }
)(withRouter(AddEducation));
