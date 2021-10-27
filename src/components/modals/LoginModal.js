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
      className="modal fade"
      id="modalLogin"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleGetUser} method="post">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ingresa tu email para publicar e interactuar
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
                Para poder interactuar o publicar posts es necesario saber tu
                cuenta de correo electronico
              </p>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="username@vecindario.com"
                  required={true}
                  onChange={updateState}
                  value={emailLogin}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                id="closeModalPost"
              >
                Cerrar
              </button>
              <input type="submit" className="btn btn-warning" value="Ingresar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
