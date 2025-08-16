// src/components/Menu.jsx
import React from "react";
import "../style/menu.css";
import menuLogo from "../img/menu-principal.png"; // Ajusta ruta si es diferente

const Menu = () => {
  return (
    <nav className="inj-sidebar">
      <ul>
        <li>
          <a href="#">
            <i className="fas fa-home"></i>
            <span className="nav-item">Inicio</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-user"></i>
            <span className="nav-item">Perfil</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-cog"></i>
            <span className="nav-item">Configuración</span>
          </a>
        </li>

        <li>
          <a href="#" className="logout">
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-item">Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
