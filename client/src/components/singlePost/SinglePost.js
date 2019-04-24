import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getOnePost } from "../../actions/postActions";

class SinglePost extends Component {
  componentDidMount() {
    this.props.getOnePost(this.props.match.params.id);
  }

  render() {
    const singlePost = this.props.post.post; // should be pulling it from props.post.post
    //console.dir(singlePost.comments);
    const { loading } = this.props.post;
    console.log("loading=", loading);
    console.log(singlePost);
    let postContent;

    if (!singlePost || loading || Object.keys(singlePost).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          {/* showAction false will hide like and unlike buttons */}
          <PostItem post={singlePost} showActions={false} />
          <CommentForm postId={singlePost._id} />

          <CommentFeed postId={singlePost._id} comments={singlePost.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light md-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  getOnePost: propTypes.func.isRequired,
  post: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getOnePost }
)(SinglePost);
