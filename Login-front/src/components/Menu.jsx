// src/components/Menu.jsx
import React, { useState } from "react";
import "../style/menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const rol = parseInt(localStorage.getItem("rol"));

  // Estado para el modal de acceso restringido
  const [modalVisible, setModalVisible] = useState(false);

  const manejarUsuariosClick = (e) => {
    e.preventDefault();
    if (rol === 1) {
      navigate("/usuarios");
    } else {
      setModalVisible(true);
      // Cierra el modal automáticamente después de 2 segundos
      setTimeout(() => setModalVisible(false), 2000);
    }
  };

  return (
    <>
      <nav className="inj-sidebar">
        <ul>
          <li>
            <a href="/productos">
              <i className="fas fa-home"></i>
              <span className="nav-item">Inicio</span>
            </a>
          </li>

          <li>
            <a href="/usuarios" className="usuarios" onClick={manejarUsuariosClick}>
              <i className="fas fa-users"></i>
              <span className="nav-item">Gestión de Usuarios</span>
            </a>
          </li>
          <li>
            <a href="/logout" className="logout">
              <i className="fas fa-sign-out-alt"></i>
              <span className="nav-item">Cerrar Sesión</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal de acceso restringido */}
      {modalVisible && (
        <div
          className="modal show"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "20px 40px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.3s",
            }}
          >
            <h4 style={{ color: "#dc3545" }}>❌ Acceso Restringido</h4>
            <p>No tienes permisos para acceder a esta sección.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
