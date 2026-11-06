import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { email, profile, getProfile, logout } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <div className="display-6 mb-3">👤</div>
          <h2 className="mb-4">Mi Perfil</h2>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <p className="text-muted mb-2">Email:</p>
            <p className="h5">{profile?.email || email || "No disponible"}</p>
          </div>

          {profile && (
            <>
              {profile.name && (
                <div className="mb-3">
                  <p className="text-muted mb-2">Nombre:</p>
                  <p className="h5">{profile.name}</p>
                </div>
              )}
            </>
          )}

          <div className="d-grid gap-2 mt-4">
            <button 
              onClick={logout} 
              className="btn btn-danger"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Fin de Profile.jsx