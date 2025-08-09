import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/producto.css';
import logo from '../img/injacom-logo-sinfondo.png';
import Menu from "../components/Menu";
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
  //siempre debe ir despues de declarar variable
  const priceWithVAT = rate != null ? (Number(rate) * 1.13) : null;

  return (
    <>
      <Navbar rol={rol} abrirModal={abrirModal} />


      <Menu />

      {modalVisible && (
        <div
          className={`modal ${showClass ? 'show' : ''}`}
          onClick={manejarClickFuera}
        >
          <Registrar cerrarModal={cerrarModal} />
        </div>
      )}

      {/* Detalle unitario */}
          <div className="col-12 col-md-7">
            <div className="card h-100 p-3">
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
              <h3 className="mb-2">{name || 'Producto'}</h3>
              <div className="text-muted mb-3">
                {sku ? <>SKU: <code>{sku}</code></> : 'SKU no disponible'}
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <p className="mb-1"><strong>Precio (con 13%):</strong></p>
                    <p className="price fs-5">₡{priceWithVAT != null ? priceWithVAT.toFixed(2) : '-'}</p>
                    {rate != null && (
                      <small className="text-muted">Precio base: ₡{Number(rate).toFixed(2)}</small>
                    )}
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

      <Footer />
    </>
  );
};

export default ProductoU;
