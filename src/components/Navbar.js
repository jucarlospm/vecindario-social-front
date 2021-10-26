import React from "react";
import Logo from "../assets/vecindario-logo.svg";
import { logoutUser } from "../store/slices/user";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="" height="30" /> Social
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <button
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalPost"
            >
              Publicar Post
            </button>
            <li class="nav-item dropdown ms-4">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-emoji-smile"></i> {user.email}
              </Link>
              <ul
                class="dropdown-menu dropdown-menu-light dropdown-menu-lg-start"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/messages">
                    Mensajes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/groups">
                    Grupos
                  </Link>
                </li>
                {user.id !== 0 ? (
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={handleLogout}
                      aria-current="page"
                    >
                      <b>Salir</b>
                    </a>
                  </li>
                ) : (
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={handleLogout}
                      aria-current="page"
                    >
                      <b>Ingresar</b>
                    </a>
                  </li>
                )}
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
