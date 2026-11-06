import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 😵</h1>
      <p>¡Oops! La página que buscas no existe.</p>
      <Link 
        to="/" 
        style={{ 
          display: "inline-block", 
          marginTop: "1rem", 
          padding: "0.5rem 1rem", 
          background: "#ff6347", 
          color: "white", 
          borderRadius: "8px", 
          textDecoration: "none" 
        }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
