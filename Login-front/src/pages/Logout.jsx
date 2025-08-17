import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Mostrar modal con animación
    setShowModal(true);
    setTimeout(() => setFadeIn(true), 10);

    // Limpiar sesión después de un pequeño delay
    const timer = setTimeout(() => {
      localStorage.clear(); // limpia todos los datos de sesión
      navigate("/", { replace: true });
    }, 2000); // 2 segundos de animación

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!showModal) return null;

  return (
    <div
      className={`modal ${fadeIn ? "show" : ""}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "50px",
          textAlign: "center",
          minWidth: "200px",
          maxWidth: "500px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2 style={{
          color: "#00699e",
          marginBottom: "20px",
          fontFamily: "Poppins, sans-serif"
        }}>
          Cerrando sesión...
        </h2>

        <div
          className="spinner-border"
          role="status"
          style={{ width: "3rem", height: "3rem", color: "#c1d72e"}}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  );
};

export default Logout;
