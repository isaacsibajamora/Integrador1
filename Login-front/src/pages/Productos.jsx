import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/producto.css';
import Menu from "../components/Menu"; 
import logo from '../img/injacom-logo-sinfondo.png';

const Producto = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showClass, setShowClass] = useState(false);


  const abrirModal = () => {
    setIsClosing(false);
    setModalVisible(true);
    setShowClass(false);

    setTimeout(() => {
      setShowClass(true);
    }, 10);
  };

  const cerrarModal = () => {
    setIsClosing(true);
    setShowClass(false);
    setTimeout(() => {
      setModalVisible(false);
      setIsClosing(false);
    }, 400); // mismo tiempo que la transición en CSS
  };

  const manejarClickFuera = (e) => {
    if (e.target.classList.contains("modal")) {
      cerrarModal();
    }
  };

  return (
    <>
      <nav className="navbar" style={{ cursor: "default" }}>
        <div className="nav-container d-flex justify-content-between align-items-center w-100 px-3">
          <img src={logo} alt="Injacom Logo" className="nav-logo img-fluid" />

          <div className="d-flex align-items-center gap-3">
            {/* Botón Registrar Usuario */}
            <button
              className="btn btn-outline-success d-flex align-items-center gap-2"
              onClick={abrirModal}
              title="Registrar Usuario"
            >
              <i className="bi bi-person-plus-fill"></i> Registrar Usuario
            </button>
          </div>
        </div>
      </nav>
     
       <Menu />

      {/* Modal */}
      {modalVisible && (
        <div className={`modal ${showClass ? "show" : ""}`} onClick={manejarClickFuera}>
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>
              &times;
            </span>

            <div className="inj-wrapper">
              <span className="inj-bg-animate"></span>
              <span className="inj-bg-animate2"></span>

              <div className="inj-form-box inj-register">
                <img
                  src={logo}
                  alt="Logo"
                  className="inj-logo inj-animation"
                  style={{
                    "--i": 16,
                    "--j": 0,
                    width: "180px",
                    marginRight: "45px",
                  }}
                />

                <h2 className="inj-animation" style={{ "--i": 17, "--j": 1 }}>
                  Registrar Usuario
                </h2>
                <form action="#">
                  <div className="inj-input-box inj-animation" style={{ "--i": 18, "--j": 2 }}>
                    <input type="text" required />
                    <label>Usuario</label>
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div className="inj-input-box inj-animation" style={{ "--i": 19, "--j": 3 }}>
                    <input type="text" required />
                    <label>Email</label>
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="inj-input-box inj-animation" style={{ "--i": 20, "--j": 4 }}>
                    <input type="password" required />
                    <label>Contraseña</label>
                    <i className="bi bi-lock-fill"></i>
                  </div>
                  <button
                    type="submit"
                    className="inj-btn inj-animation"
                    style={{ "--i": 21, "--j": 4 }}
                  >
                    Registrar
                  </button>
                </form>
              </div>

              <div className="inj-info-text inj-register">
                <h2 className="inj-animation" style={{ "--i": 17, "--j": 0 }}>
                  Bienvenido a Injacom
                </h2>
                <p className="inj-animation" style={{ "--i": 18, "--j": 1 }}>
                  Tecnología confiable y soluciones a tu alcance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid py-5 mt-5">
        <form className="search-bar d-flex flex-wrap w-100 justify-content-center" role="search">
          <input
            type="text"
            className="form-control me-2 mb-2 mb-md-0"
            placeholder="Buscar producto..."
          />
          <button className="search-btn" type="submit">
            <i className="bi bi-search" />
          </button>
        </form>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm">
              <img src="" className="card-img-top img-fluid" alt="Producto 1" />
              <div className="card-body text-center">
                <h5 className="card-title">Nombre del Producto 1</h5>
                <p className="card-text"><strong>Precio:</strong> ₡12,000</p>
                <button className="show-btn btn-primary">Ver más</button>
              </div>
            </div>
          </div>
          {/* Agrega más productos aquí */}
        </div>
      </div>

      <footer className="footer-custom text-center mt-5">
        <div className="container py-3">
          <p><strong>IJC Solutions Filter</strong></p>
          <p>Desarrollado por estudiantes de Ingeniería en Tecnologías de la Información, Universidad Técnica Nacional.</p>
          <p>© 2025</p>
        </div>
      </footer>
    </>
  );
};

export default Producto;
