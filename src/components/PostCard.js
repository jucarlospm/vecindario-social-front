import React from "react";
import { Link } from "react-router-dom";
import LikeButtons from "./LikeButtons";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="card mb-4">
      <div className="card-body ">
        <h4 className="card-title">
          <Link
            style={{ color: "#ffc107", fontWeight: "800" }}
            to={`/post/${post.id}`}
          >{`${post.title}`}</Link>
        </h4>

        <small>
          <b>Publicado por:</b> {post.email}
        </small>
        <p className="card-text">{post.content.slice(0, 255)}</p>
        <div className="row">
          <div className="col-5">
            <button class="btn btn-light btn-sm">
              <i class="bi bi-chat-left-text"></i>{" "}
              <span class="badge bg-light text-dark">
                {post.comments_count}
              </span>
            </button>
          </div>
          <div className="col-7 text-end">
            <LikeButtons
              current_user_interaction={post.current_user_interaction}
              user_id={user.id}
              post_id={post.id}
              likes={post.likes}
              dislikes={post.dislikes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
