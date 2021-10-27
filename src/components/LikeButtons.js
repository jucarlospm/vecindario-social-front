import React from "react";
import { useDispatch } from "react-redux";

import { updateInteraction } from "../store/slices/posts";
import { Toast } from "./Toast";

const LikeButtons = ({
  current_user_interaction,
  user_id,
  post_id,
  likes,
  dislikes,
}) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    const interaction = {
      post_id: parseInt(post_id),
      user_id: parseInt(user_id),
      action: "like",
    };

    if (interaction.user_id === 0) {
      Toast("warn", "Debes ingresar tu email para poder interactuar");
      return;
    }

    dispatch(updateInteraction(interaction));
  };

  const handleDislike = (e) => {
    const interaction = {
      post_id: parseInt(post_id),
      user_id: parseInt(user_id),
      action: "dislike",
    };

    if (interaction.user_id === 0) {
      Toast("warn", "Debes ingresar tu email para poder interactuar");
      return;
    }

    dispatch(updateInteraction(interaction));
  };

  return (
    <div className="btn-group btn-group-sm">
      <button
        className={`btn ${
          current_user_interaction === "like" ? "btn-warning" : "btn-light"
        } `}
        name="like"
        onClick={handleLike}
      >
        <i className="bi bi-hand-thumbs-up"></i>{" "}
        <span className="d-none d-md-inline">Me gusta </span>
        <span
          className={`badge ${
            current_user_interaction === "like"
              ? "bg-warning text-dark"
              : "bg-light text-dark"
          } `}
        >
          {likes}
        </span>
      </button>
      <button
        className={`btn ${
          current_user_interaction === "dislike" ? "btn-warning" : "btn-light"
        } `}
        name="like"
        onClick={handleDislike}
      >
        <i className="bi bi-hand-thumbs-down"></i>{" "}
        <span className="d-none d-md-inline">No Me gusta </span>
        <span
          className={`badge ${
            current_user_interaction === "dislike"
              ? "bg-warning text-dark"
              : "bg-light text-dark"
          } `}
        >
          {dislikes}
        </span>
      </button>
    </div>
  );
};

export default LikeButtons;
