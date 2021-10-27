import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/slices/user";
import { Toast } from "../Toast";

const LoginModal = () => {
  const dispatch = useDispatch();
  const [emailLogin, updateEmailLogin] = useState();

  const handleGetUser = (e) => {
    e.preventDefault();

    const email = emailLogin;
    dispatch(getUser(email));

    document.getElementById("closeModalPost").click();
    Toast("success", "Ha ingresado su email correctamente", "top-center");
    updateEmailLogin("");
  };

  const updateState = (e) => {
    updateEmailLogin(e.target.value);
  };

  return (
    <div
      class="modal fade"
      id="modalLogin"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
                  onChange={updateState}
                  value={emailLogin}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
                id="closeModalPost"
              >
                Cerrar
              </button>
              <input type="submit" class="btn btn-warning" value="Ingresar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
