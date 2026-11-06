
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../assets/css/Form.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form);
    setLoading(false);
    if (!res.ok) {
      setError(res.message || "Error al iniciar sesión");
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <div className="display-6 mb-3">🔐</div>
          <h2 className="mb-4">Iniciar sesión</h2>
        </div>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className={`btn ${loading ? 'btn-secondary' : 'btn-primary'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Cargando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// Fin de Login.jsx