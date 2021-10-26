import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/slices/posts";
import { getUser } from "../../store/slices/user";

const PostModal = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [post, updatePost] = useState({
    title: "",
    content: "",
  });

  const [error, updateError] = useState(false);

  const updateState = (e) => {
    updatePost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetUser = (e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    dispatch(getUser(email));
  };

  const { title, content } = post;

  const handleCreatePost = (e) => {
    e.preventDefault();

    // Validate
    if (title.trim() === "" || content.trim() === "") {
      updateError(true);
      return;
    }

    updateError(false);
    post.user_id = user.id;

    dispatch(createPost(post));
    document.getElementById("closeModalPost").click();

    // Reset Form
    updatePost({
      title: "",
      content: "",
    });
  };

  const FormPost =
    user.id === 0 ? (
      <div class="modal-content">
        <form onSubmit={handleGetUser} method="post">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Ingresa tu email para publicar e interactuar
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Para poder interactuar o publicar posts es necesario saber tu
              cuenta de correo electronico
            </p>

            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="username@vecindario.com"
                required={true}
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <input type="submit" class="btn btn-primary" value="Ingresar" />
          </div>
        </form>
      </div>
    ) : (
      <div class="modal-content">
        <form onSubmit={handleCreatePost} method="post">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Publicar Post{" "}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {error ? (
              <div class="alert alert-danger" role="alert">
                Todos los campos son requeridos
              </div>
            ) : null}
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                placeholder="Nombre del Post"
                onChange={updateState}
                value={title}
              />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                id="content"
                name="content"
                rows="5"
                placeholder="Contentido del Post"
                onChange={updateState}
                value={content}
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="closeModalPost"
            >
              Cerrar
            </button>
            <input class="btn btn-primary" type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    );

  return (
    <div
      class="modal fade"
      id="modalPost"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">{FormPost}</div>
    </div>
  );
};

export default PostModal;
