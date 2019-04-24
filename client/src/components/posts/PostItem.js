import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames"; // for making magic !
// use javascript es6 to add or remove classname from JSX so we can change style dynamically
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import "./postItem.css";

/* subComponent related to each single post */
class PostItem extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // delete your own post
  onDeleteClick(_id) {
    this.props.deletePost(_id);
  }

  // like someone's post
  onLikeClick(_id) {
    this.props.addLike(_id);
  }

  // dislike a post
  onDislikeClick(_id) {
    this.props.removeLike(_id);
  }

  // check if this user already liked a post
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      // if this user's id is in the like array ( likes are userid remember )
      return true;
    } else {
      return false;
    }
  }

  render() {
    // showActions determine whether to show like and unlike buttons
    const { post, auth, showActions } = this.props;
    // post props is from PostFeed parent, auth is from redux state
    const { errors } = this.state;

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
            {showActions ? (
              <span>
                <button
                  type="button"
                  onClick={this.onLikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  {/*errors && errors.liked ? <span>{errors.liked}</span> : null*/}
                  <i
                    classnames={classnames("fas fa-thumb-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <i className="text-info fas fa-thumbs-up" />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={this.onDislikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
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
                {/* Show you already like this only if user liked this post */}
                {this.findUserLike(post.likes) ? (
                  <p className="vanish">You liked this!</p>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: propTypes.func.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired,
  post: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
