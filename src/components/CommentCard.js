import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="card border-light bg-light">
      <div className="card-body ">
        <small className="card-title">
          {comment.email}{" "}
          <small className="text-muted">
            {new Date(comment.publication_date).toLocaleString("es-CO")}
          </small>
        </small>
        <h5>{comment.title}</h5>

        <p className="card-text">
          <small>{comment.content}</small>
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
