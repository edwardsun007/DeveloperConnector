import React, { Component } from "react";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom"; //
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // bind
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // To prevent a authenticaed user sees SignUp form via visitng /domain/register, simply redirect it
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // redirect
    }
  }

  // redux state pass errors state from action and pass in to this component as errors props
  // then here once we receive new props, if errors is inside the props, here we set Register's component state.errors
  // note its component state.errors here not Redux state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      // set field with the field's value
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // dispatched action come into component as a props
    this.props.registerUser(newUser, this.props.history); // allow to redirect to this.props.history within registerUser action
  }

  render() {
    // this is component state remember not redux state
    const { errors } = this.state; // es6 destructing syntax-- const errors = this.state.errors

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevCon account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// all action passed in will be mapped as props of Register component remember,
// so the property / key name below need to matched identical as the one you give in action.js
// so that we can visit by doing this.props.auth   or this.props.registerUser or this.props.errors
Register.propTypes = {
  registerUser: propTypes.func.isRequired, // registerUser is a function and its required
  auth: propTypes.object.isRequired, // auth is object and its required
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // auth need to obey the name you set in combine reducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
