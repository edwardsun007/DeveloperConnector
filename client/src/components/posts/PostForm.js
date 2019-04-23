import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super();
    // always keep state initialized in the constructor
    // component states initialized here
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // gather user input data and then call the actions with it
    const { user } = this.props.auth;
    const postData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    // call the action passed thru
    this.props.addPost(postData);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange.bind(this)}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
