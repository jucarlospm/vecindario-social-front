import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-4">
      <div className="card-body ">
        <h4 className="card-title">
          <Link
            className="dropdown-item"
            to={`/post/${post.id}`}
          >{`${post.title}`}</Link>
        </h4>

        <small>
          <b>Publicado por:</b> {post.email}
        </small>
        <p className="card-text">{post.content}</p>
        <div className="row">
          <div className="col-5">
            <button class="btn btn-light btn-sm">
              <i class="bi bi-chat-left-text"></i>{" "}
              <span class="badge bg-light text-dark">{post.comments_count}</span>
            </button>
          </div>
          <div className="col-7 text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-light">
                <i class="bi bi-hand-thumbs-up"></i>{" "}
                <span className="d-none d-md-inline">Me gusta </span>
                <span class="badge bg-light text-dark">{post.likes}</span>
              </button>
              <button class="btn btn-light">
                <i class="bi bi-hand-thumbs-down"></i>{" "}
                <span className="d-none d-md-inline">No Me gusta </span>
                <span class="badge bg-light text-dark">{post.dislikes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
