import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import "../assets/css/Navbar.css";

export default function Navbar() {
  const { email, logout } = useAuth();
  const { cart = [] } = useCart();

  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🍕 MammaMia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                🛒 Carrito
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
            {email ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    👤 Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-outline-light ms-2"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-2" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
