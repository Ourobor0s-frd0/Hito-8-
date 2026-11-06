
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // si hay token cargado, intentar obtener perfil (opcional)
    if (token) {
      getProfile();
    }
 
  }, []);

  const saveAuth = (newToken, newEmail) => {
    setToken(newToken);
    setEmail(newEmail);
    if (newToken) localStorage.setItem("token", newToken); else localStorage.removeItem("token");
    if (newEmail) localStorage.setItem("email", newEmail); else localStorage.removeItem("email");
  };

  const login = async ({ email: e, password }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");
      // Se espera { token: "...", email: "..." } o similar
      saveAuth(data.token || data.accessToken || "", data.email || e);
      await getProfile(data.token || localStorage.getItem("token"));
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, message: err.message };
    }
  };

  const register = async ({ email: e, password }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registro fallido");
      saveAuth(data.token || data.accessToken || "", data.email || e);
      await getProfile(data.token || localStorage.getItem("token"));
      setLoading(false);
      return { ok: true };
    } catch (err) {
      setLoading(false);
      return { ok: false, message: err.message };
    }
  };

  const logout = () => {
    saveAuth(null, null);
    setProfile(null);
    navigate("/", { replace: true });
  };

  const getProfile = async (overrideToken = null) => {
    const tk = overrideToken || token || localStorage.getItem("token");
    if (!tk) return { ok: false, message: "No token" };
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        // token inválido -> limpiar
        saveAuth(null, null);
        setProfile(null);
        return { ok: false, message: "No se puede obtener el perfil" };
      }
      const data = await res.json();
      setProfile(data);
      // si la respuesta trae email se debe sincronizar
      if (data.email && data.email !== email) {
        setEmail(data.email);
        localStorage.setItem("email", data.email);
      }
      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  const value = {
    token,
    email,
    profile,
    loading,
    login,
    register,
    logout,
    getProfile,
    saveAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
// Fin de AuthContext.jsx