import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="card bg-light">
      <div className="card-body ">
        <h4 className="card-title">
          {comment.title}
        </h4>
        <small>(Commentado por: {comment.email})</small>
        <p className="card-text">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
