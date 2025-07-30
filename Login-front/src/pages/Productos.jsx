import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/producto.css';
import Menu from "../components/Menu";
import logo from '../img/injacom-logo-sinfondo.png';
import Registrar from './Registrar'; // Importar el componente Registrar
import { Link } from 'react-router-dom';

const Productos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  // Cargar productos desde la API al montar

  // Buscar productos en la API cada vez que cambia la búsqueda
  // Cargar todos los productos al inicio
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/api/items');
        const data = await res.json();
        setProductos(data);
      } catch {
        setProductos([]);
      }
    })();
  }, []);

  // Buscar productos solo al hacer submit
  const handleSearch = async (e) => {
    e.preventDefault();
    const url = busqueda.trim() === ''
      ? 'http://localhost:3001/api/items'
      : `http://localhost:3001/api/items?search=${encodeURIComponent(busqueda)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProductos(data);
    } catch {
      setProductos([]);
    }
  };

  const rol = parseInt(localStorage.getItem('rol'));



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
          {rol === 1 && (
                <button
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                  onClick={abrirModal}
                  title="Registrar Usuario"
                >
                  <i className="bi bi-person-plus-fill"></i> Registrar Usuario
                </button>
              )}

          </div>
        </div>
      </nav>

      <Menu />

      {/* Modal que usa el componente Registrar */}
      
      
      {modalVisible &&(
        
        <div
          className={`modal ${showClass ? 'show' : ''}`}
          onClick={manejarClickFuera}
        >
          <Registrar cerrarModal={cerrarModal} />
        </div>
      )}

      <div className="container-fluid py-5 mt-5">
        <form className="search-bar d-flex flex-wrap w-100 justify-content-center" role="search" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2 mb-2 mb-md-0"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <i className="bi bi-search" />
          </button>
        </form>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div className="col-sm-6 col-md-4" key={producto.sku || producto.item_id}>
                <div className="card h-100 shadow-sm">
                  {producto.image_url ? (
                    <img src={producto.image_url} className="card-img-top img-fluid" alt={producto.name} style={{objectFit:'contain',height:'180px',background:'#f8f9fa'}} />
                  ) : (
                    <div className="card-img-top text-center py-4" style={{height:'180px',background:'#f8f9fa',color:'#bbb',display:'flex',alignItems:'center',justifyContent:'center'}}>Sin imagen</div>
                  )}
                  <div className="card-body text-center">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text"><strong>Precio:</strong> ₡{producto.rate}</p>
                    <p className="card-text"><strong>Stock:</strong> {producto.stock_on_hand ?? '-'}</p>
                    <Link to="/productou">
                      <button className="show-btn btn-primary">Ver más</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No hay productos para mostrar.</div>
          )}
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

export default Productos;
