import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentCard from "../components/CommentCard";
import LikeButtons from "../components/LikeButtons";
import { createComment } from "../store/slices/posts";

import { useParams, useHistory } from "react-router-dom";
import { getPost } from "../store/slices/posts";
import { Toast } from "../components/Toast";

const PostPage = ({ post }) => {
  const { currentPost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  const {
    title,
    content,
    likes,
    dislikes,
    email,
    publication_date,
    comments,
    current_user_interaction,
  } = currentPost;
  let { id } = useParams();
  const dispatch = useDispatch();
  const [comment, updateComment] = useState({
    title: "",
    content: "",
  });

  const [error, updateError] = useState(false);

  const updateState = (e) => {
    updateComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateComment = (e) => {
    e.preventDefault();

    // Validate
    if (title.trim() === "" || content.trim() === "") {
      updateError(true);
      return;
    }

    updateError(false);
    comment.user_id = parseInt(user.id);
    comment.post_id = parseInt(id);

    dispatch(createComment(comment));
    Toast("success", "Comentario agregado correctamente", "top-center");

    // Reset Form
    updateComment({
      title: "",
      content: "",
    });
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <div className="container my-4">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <div className="card border-light">
            <div className="card-body ">
              <button
                onClick={() => {
                  history.goBack();
                }}
                className="btn btn-outline-dark mb-4"
              >
                <i className="bi bi-arrow-left-short"></i> Regresar
              </button>
              <h1
                style={{ color: "#ffc107", fontWeight: "800" }}
                className="card-title"
              >
                {title}
              </h1>
              <small>
                <b>Fecha de publicación: </b>
                {new Date(publication_date).toLocaleString("es-CO")}
              </small>

              <p className="card-text">{content}</p>
              <p>
                <small>
                  <b>Publicado por: </b>
                  {email}
                </small>
              </p>
              <div className="row">
                <div className="col-5">
                  <button className="btn btn-light btn-sm">
                    <i className="bi bi-chat-left-text"></i>{" "}
                    <span className="badge bg-light text-dark">
                      {comments.length}
                    </span>
                  </button>
                </div>
                <div className="col-7 text-end">
                  <LikeButtons
                    current_user_interaction={current_user_interaction}
                    user_id={user.id}
                    post_id={id}
                    likes={likes}
                    dislikes={dislikes}
                  />
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleCreateComment} method="post">
            <div className="card">
              <div className="card-body">
                {error ? (
                  <div className="alert alert-danger" role="alert">
                    Todos los campos son requeridos
                  </div>
                ) : null}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Nombre del Post"
                    onChange={updateState}
                    value={comment.title}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows="3"
                    placeholder="Contentido del Post"
                    onChange={updateState}
                    value={comment.content}
                  ></textarea>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <input
                    className="btn btn-warning"
                    type="submit"
                    value="Publicar"
                  />
                </div>
              </div>
            </div>
          </form>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
