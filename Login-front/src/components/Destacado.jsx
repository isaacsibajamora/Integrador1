import "../style/destacado.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/injacom-logo-sinfondo.png";
import React, { useState } from "react";

const Destacado = () => {
  return (
    <>

      <nav className="navbar">
        <div className="nav-container container-fluid">
          <img src={logo} alt="Injacom Logo" className="nav-logo img-fluid" />
        </div>
      </nav>

    

      <footer className="footer-custom1 text-center mt-5">
        <div className="container py-3">
          <p>
            <strong>IJC Solutions Filter</strong>
          </p>
          <p>
            Desarrollado por estudiantes de Ingeniería en Tecnologías de la
            Información, Universidad Técnica Nacional.
          </p>
          <p>© 2025</p>
        </div>
      </footer>
    </>
  );
};

export default Destacado;
