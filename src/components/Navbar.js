import React from "react";
import Logo from "../assets/vecindario-logo.svg";
import { logoutUser } from "../store/slices/user";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toast } from "./Toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    document.getElementById("offmenu").click();
    Toast("success", "Ha cerrado sesión correctamente", "top-center");
  };

  const handleClickItem = (e) => {
    document.getElementById("offmenu").click();
  };

  return (
    <nav class="navbar navbar-light sticky-top bg-light">
      <div class="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="" height="30" /> Social
        </Link>
        <div class="d-flex">
          <button
            class="btn btn-warning me-4 d-inline d-none d-sm-block"
            data-bs-toggle="modal"
            data-bs-target="#modalPost"
          >
            Publicar Post
          </button>
          <button
            class="navbar-toggler"
            type="button"
            id="offmenu"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <img src={Logo} alt="" height="40" />
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div class="d-grid gap-2 d-block d-sm-none">
              <button
                class="btn btn-warning me-4 d-inline"
                data-bs-toggle="modal"
                onClick={handleClickItem}
                data-bs-target="#modalPost"
              >
                Publicar Post
              </button>
            </div>
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <spam className="nav-link">
                  <b>{user.email ? `${user.email}` : ``}</b>
                </spam>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link"
                  onClick={handleClickItem}
                  to="/profile"
                >
                  Mi Perfil
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link"
                  onClick={handleClickItem}
                  to="/messages"
                >
                  Mensajes
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link"
                  onClick={handleClickItem}
                  to="/groups"
                >
                  Grupos
                </Link>
              </li>
              {user.id !== 0 ? (
                <li class="nav-item">
                  <Link
                    className="nav-link"
                    onClick={handleLogout}
                    aria-current="page"
                  >
                    <b>Salir</b>
                  </Link>
                </li>
              ) : (
                <li class="nav-item">
                  <Link
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLogin"
                    onClick={handleClickItem}
                  >
                    <b>Ingresar</b>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
