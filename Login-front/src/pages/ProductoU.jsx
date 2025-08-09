import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/producto.css';
import logo from '../img/injacom-logo-sinfondo.png';
import Footer from '../components/Footer';
import Navbar from "../components/NavBar";         // ← faltaba
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3001/api';

const ProductoU = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto || null; // ← solo desde la carta
  const rol = parseInt(localStorage.getItem('rol'));

  // Modal (tu misma lógica)
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const abrirModal = () => { setIsClosing(false); setModalVisible(true); setShowClass(false); setTimeout(() => setShowClass(true), 10); };
  const cerrarModal = () => { setIsClosing(true); setShowClass(false); setTimeout(() => { setModalVisible(false); setIsClosing(false); }, 400); };
  const manejarClickFuera = (e) => { if (e.target.classList.contains("modal")) cerrarModal(); };

  if (!producto) {
    return (
      <>
        <Navbar rol={rol} abrirModal={abrirModal} />
        <div className="container py-5 text-center">
          <i className="bi bi-info-circle fs-1 text-muted"></i>
          <h5 className="mt-3">Abre el detalle desde “Ver más” en la lista de productos.</h5>
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left"></i> Volver
            </button>
            <Link to="/productos" className="btn btn-primary">Ir a productos</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { item_id, name, sku, rate, stock_on_hand, model, description, brand, manufacturer, attributes } = producto;

  return (
    <>
      <Navbar rol={rol} abrirModal={abrirModal} />

      {/* Modal */}
      {modalVisible && (
        <div className={`modal ${showClass ? "show" : ""}`} onClick={manejarClickFuera}>
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <div className="inj-wrapper">
              <span className="inj-bg-animate"></span>
              <span className="inj-bg-animate2"></span>
              <div className="inj-form-box inj-register">
                <img src={logo} alt="Logo" className="inj-logo inj-animation" style={{ "--i": 16, "--j": 0, width: "180px", marginRight: "45px" }} />
                <h2 className="inj-animation" style={{ "--i": 17, "--j": 1 }}>Registrar Usuario</h2>
                <form action="#">
                  <div className="inj-input-box inj-animation" style={{ "--i": 18, "--j": 2 }}>
                    <input type="text" required /><label>Usuario</label><i className="bi bi-person-fill"></i>
                  </div>
                  <div className="inj-input-box inj-animation" style={{ "--i": 19, "--j": 3 }}>
                    <input type="text" required /><label>Email</label><i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="inj-input-box inj-animation" style={{ "--i": 20, "--j": 4 }}>
                    <input type="password" required /><label>Contraseña</label><i className="bi bi-lock-fill"></i>
                  </div>
                  <button type="submit" className="inj-btn inj-animation" style={{ "--i": 21, "--j": 4 }}>Registrar</button>
                </form>
              </div>
              <div className="inj-info-text inj-register">
                <h2 className="inj-animation" style={{ "--i": 17, "--j": 0 }}>Bienvenido a Injacom</h2>
                <p className="inj-animation" style={{ "--i": 18, "--j": 1 }}>Tecnología confiable y soluciones a tu alcance.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detalle unitario */}
      <div className="container py-5 mt-4">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <div className="card h-100">
              <div className="card-img-container">
  <img
    src={producto.image_url
      ? producto.image_url
      : `${API_BASE}/items/${item_id}/image`}
    alt={name || 'Producto'}
    className="card-img-top"
    onError={(e) => { e.currentTarget.src = '/img/no-image.png'; }}
  />
</div>

            </div>
          </div>

          <div className="col-12 col-md-7">
            <div className="card h-100 p-3">
              <h3 className="mb-2">{name || 'Producto'}</h3>
              <div className="text-muted mb-3">
                {sku ? <>SKU: <code>{sku}</code></> : 'SKU no disponible'}
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <p className="mb-1"><strong>Precio:</strong></p>
                  <p className="price fs-5">₡{rate ?? '-'}</p>
                </div>
                <div className="col-6">
                  <p className="mb-1"><strong>Stock:</strong></p>
                  <p className="stock fs-5">{stock_on_hand ?? '-'}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1"><strong>Modelo:</strong></p>
                <p>{model ?? '-'}</p>
              </div>

              <div className="mb-3">
                <p className="mb-1"><strong>Marca:</strong></p>
                <p>{brand ?? manufacturer ?? '-'}</p>
              </div>

              <div className="mb-3">
                <p className="mb-1"><strong>Descripción:</strong></p>
                <p className="mb-0">{description ?? 'Sin descripción.'}</p>
              </div>

              {attributes && Array.isArray(attributes) && attributes.length > 0 && (
                <div className="mb-3">
                  <p className="mb-2"><strong>Características:</strong></p>
                  <ul className="mb-0">
                    {attributes.map((a, idx) => (
                      <li key={idx}>{(a.label || a.name) ?? 'Atributo'}: {a.value ?? '-'}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                  <i className="bi bi-arrow-left"></i> Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductoU;
