import React, { Component } from "react";
import propTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    console.log(this.props.postId);
    const { comments, postId } = this.props;
    console.log(comments);
    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: propTypes.array.isRequired,
  postId: propTypes.string.isRequired
};

export default CommentFeed;
