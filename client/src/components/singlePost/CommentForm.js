import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
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
    const { postId } = this.props; // post from the singlePost parent

    const commentData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    // call the action passed thru
    this.props.addComment(postId, commentData);
    // for clearing the form by set component state text to empty
    this.setState({ text: "" });
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
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Reply to post"
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

CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
