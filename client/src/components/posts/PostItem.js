import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(_id) {
    this.props.deletePost(_id);
  }

  render() {
    const { post, auth } = this.props;
    // post props is from PostFeed parent, auth is from redux

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-2">
              Comments
            </Link>
            {/* delete comment button only shows for comment creator */}
            {post.user === auth.user.id ? (
              <button
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick.bind(this, post._id)}
                type="button"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: propTypes.func.isRequired,
  post: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
