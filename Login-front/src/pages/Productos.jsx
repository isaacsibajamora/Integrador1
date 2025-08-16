import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/producto.css';
import Menu from "../components/Menu";
import logo from '../img/injacom-logo-sinfondo.png';
import Navbar from "../components/NavBar"; // componentes
import Footer from '../components/Footer';
import Registrar from './Registrar';
import { Link } from 'react-router-dom';

const Productos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosVisibles, setProductosVisibles] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PRODUCTS_PER_PAGE = 4;

  // Cargar todos los productos al inicio
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/api/items');
        const data = await res.json();
        setProductos(data);
        setProductosVisibles(data.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(data.length > PRODUCTS_PER_PAGE);
        setCurrentPage(1);
      } catch {
        setProductos([]);
        setProductosVisibles([]);
        setHasMore(false);
      }
      setLoading(false);

    })();
  }, []);

  // Buscar productos
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = busqueda.trim() === ''
      ? 'http://localhost:3001/api/items'
      : `http://localhost:3001/api/items?search=${encodeURIComponent(busqueda)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProductos(data);
      setProductosVisibles(data.slice(0, PRODUCTS_PER_PAGE));
      setHasMore(data.length > PRODUCTS_PER_PAGE);
      setCurrentPage(1);
    } catch {
      setProductos([]);
      setProductosVisibles([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Cargar más productos
  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const newProducts = productos.slice(startIndex, endIndex);

    if (newProducts.length > 0) {
      setProductosVisibles(prev => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < productos.length);
    } else {
      setHasMore(false);
    }
  }, [productos, currentPage, loading, hasMore]);

  // Detectar scroll para cargar más productos
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

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
    }, 400);
  };

  const manejarClickFuera = (e) => {
    if (e.target.classList.contains("modal")) {
      cerrarModal();
    }
  };

  return (
    <>
      <Navbar rol={rol} abrirModal={abrirModal} /> {/* Usamos el nuevo componente Navbar */
      


      }

      <Menu />

      {modalVisible && (
        <div
          className={`modal ${showClass ? 'show' : ''}`}
          onClick={manejarClickFuera}
        >
          <Registrar cerrarModal={cerrarModal} />
        </div>
      )}

      <div className="main-content">
        <div className="container-fluid py-1">
          <form className="search-bar d-flex justify-content-center mb-4" role="search" onSubmit={handleSearch}>

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

          <div className="productos-grid">
            {productosVisibles.length > 0 ? (
              productosVisibles.map(producto => (
                <div className="producto-card" key={producto.sku || producto.item_id}>
                  <div className="card h-100">
                    <div className="card-img-container">
                      {(producto.image_url || producto.item_id) ? (
                        <img
                          src={
                            producto.image_url
                              ? producto.image_url
                              : `http://localhost:3001/api/items/${producto.item_id}/image`
                          }
                          alt={producto.name}
                          className="card-img"
                          loading="lazy"
                          onError={(e) => {
                            // Si la imagen no carga, mostramos el placeholder
                            e.target.onerror = null;
                            e.target.replaceWith(
                              Object.assign(document.createElement("div"), {
                                className: "card-img-placeholder",
                                innerHTML: `<i class="bi bi-image"></i><span>Sin imagen</span>`,
                              })
                            );
                          }}
                        />
                      ) : (
                        <div className="card-img-placeholder">
                          <i className="bi bi-image"></i>
                          <span>Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">{producto.name}</h6>
                      <div className="card-details">
                        <p className="price">Precio: ₡{producto.rate}</p>
                        <p className="stock">Stock: {producto.stock_on_hand ?? '-'}</p>
                      </div>

                      <Link
                        to="/productou"
                        state={{ producto }}           // ← agrega esto
                        className="btn-link"
                      >
                        <button className="btn-ver-mas">Ver más</button>
                      </Link>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <i className="bi bi-box-seam mb-3"></i>
                    <p>No hay productos para mostrar.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {loading && productosVisibles.length > 0 && (
            <div className="text-center mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando más productos...</span>
              </div>
            </div>
          )}

          {!hasMore && productosVisibles.length > 0 && (
            <div className="text-center mt-4 text-muted">
              <p>No hay más productos para mostrar</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Productos;