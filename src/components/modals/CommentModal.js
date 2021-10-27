import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/slices/posts";
import { getUser } from "../../store/slices/user";
import { Toast } from "../Toast";

const CommentModal = ({ post_id }) => {
  const { user } = useSelector((state) => state.user);
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

  const handleGetUser = (e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    dispatch(getUser(email));
  };

  const { title, content } = comment;

  const handleCreateComment = (e) => {
    e.preventDefault();

    // Validate
    if (title.trim() === "" || content.trim() === "") {
      updateError(true);
      return;
    }

    updateError(false);
    comment.user_id = user.id;
    comment.post_id = post_id;

    dispatch(createComment(comment));
    document.getElementById(`closeModalPost${post_id}`).click();
    Toast("success", "Comentario agregado correctamente", "top-center");

    // Reset Form
    updateComment({
      title: "",
      content: "",
    });
  };

  const FormPost =
    user.id === 0 ? (
      <div className="modal-content">
        <form onSubmit={handleGetUser} method="post">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ingresa tu email
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Para poder comentar este post es necesario saber tu cuenta de
              correo electronico
            </p>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="username@vecindario.com"
                required={true}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
              Cerrar
            </button>
            <input type="submit" className="btn btn-warning" value="Ingresar" />
          </div>
        </form>
      </div>
    ) : (
      <div className="modal-content">
        <form onSubmit={handleCreateComment} method="post">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Comentar Post{" "}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
                placeholder="Titulo del comentario"
                onChange={updateState}
                value={title}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                placeholder="Contentido del comentario"
                onChange={updateState}
                value={content}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
              id={`closeModalPost${post_id}`}
            >
              Cerrar
            </button>
            <input className="btn btn-warning" type="submit" value="Comentar" />
          </div>
        </form>
      </div>
    );

  return (
    <div
      className="modal fade"
      id={`modalComment${post_id}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">{FormPost}</div>
    </div>
  );
};

export default CommentModal;
