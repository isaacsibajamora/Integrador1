// src/components/Producto.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/producto.css';
import logo from '../assets/injacom-logo-sinfondo.png';

const Producto = () => {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container container-fluid">
                    <img src={logo} alt="Injacom Logo" className="nav-logo img-fluid" />
                </div>
            </nav>

            <div className="container-fluid py-5 mt-5">
                <form className="search-bar d-flex flex-wrap w-100 justify-content-center" role="search">
                    <input
                        type="text"
                        className="form-control me-2 mb-2 mb-md-0"
                        placeholder="Buscar producto..."
                    />
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-search" />
                    </button>
                </form>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
                    <div className="col-sm-6 col-md-4">
                        <div className="card h-100 shadow-sm">
                            <img src="" className="card-img-top img-fluid" alt="Producto 1" />
                            <div className="card-body">
                                <h5 className="card-title">Nombre del Producto 1</h5>
                                <p className="card-text"><strong>SKU:</strong> 12345</p>
                                <p className="card-text"><strong>Precio:</strong> ₡12,000</p>
                                <p className="card-text"><strong>Cantidad disponible:</strong> 25</p>
                                <p className="card-text"><strong>Modelo:</strong> A1</p>
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
