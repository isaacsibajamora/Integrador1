import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/producto.css";
import Menu from "../components/Menu";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Registrar from "./Registrar";
import EditarUsuario from "./EditarUsuario";

const API_BASE = "http://localhost:3001/api";

const Usuarios = () => {
  const rol = parseInt(localStorage.getItem("rol"));

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const abrirModal = () => {
    setUsuarioEditando(null);
    setModalVisible(true);
    setShowClass(false);
    setTimeout(() => setShowClass(true), 10);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setModalVisible(true);
    setShowClass(false);
    setTimeout(() => setShowClass(true), 10);
  };

  const cerrarModal = () => {
    setShowClass(false);
    setTimeout(() => {
      setModalVisible(false);
      setUsuarioEditando(null);
    }, 400);
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudieron cargar los usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (users) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${API_BASE}/usuarios/${users}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMensaje("✅ Usuario eliminado");
        fetchUsuarios();
      } else {
        setMensaje("❌ Error al eliminar");
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión");
    }
  };

  return (
    <>
  <style>{`
    /* ===== Botón "Nuevo Usuario" ===== */
    .btn-azul {
      background: var(--verde-principal);
      border: none;
      border-radius: 5px;
      color: var(--blanco);
      padding: 8px 16px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-azul:hover {
      background: #adbe3bff;
      transform: translateY(-2px);
    }

    /* ===== Botón Editar ===== */
    .btn-azul-mini {
      background: var(--azul-principal);
      border: none;
      border-radius: 5px;
      color: var(--blanco);
      padding: 6px 12px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-azul-mini:hover {
      background: var(--azul-oscuro);
      transform: translateY(-1px);
    }

    /* ===== Botón Eliminar ===== */
    .btn-celeste-mini {
      background: var(--verde-principal);
      border: none;
      border-radius: 5px;
      color: var(--blanco);
      padding: 6px 12px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-celeste-mini:hover {
      background: #adbe3bff;;
      color: var(--blanco);
      transform: translateY(-1px);
    }

    /* ===== Tabla de Usuarios ===== */
    .tabla-personalizada {
      border-radius: 5px;
      overflow: hidden;
      font-size: 15px;
      border: 1px solid #dee2e6;
    }

 
  .rol-badge {
    background: var(--azul-principal); /* fondo acorde a tu paleta */
    color: var(--blanco);              /* texto blanco */
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 600;
  }


  `}</style>

    
      <Navbar rol={rol} abrirModal={abrirModal} />
      <Menu />

      {modalVisible && (
        <div
          className={`modal ${showClass ? "show" : ""}`}
          onClick={(e) => e.target.classList.contains("modal") && cerrarModal()}
        >
          {usuarioEditando ? (
            <EditarUsuario
              cerrarModal={cerrarModal}
              usuarioData={usuarioEditando}
              recargarUsuarios={fetchUsuarios}
            />
          ) : (
            <Registrar cerrarModal={cerrarModal} recargarUsuarios={fetchUsuarios} />
          )}
        </div>
      )}

      <div className="main-content">
        <div className="container-fluid py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">
              <i className="bi bi-people-fill me-1"></i> Gestión de Usuarios
            </h3>
            <button className="btn-azul" onClick={abrirModal}>
              <i className="bi bi-person-plus"></i> Nuevo Usuario
            </button>
          </div>

          {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : usuarios.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle w-100 tabla-personalizada">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center">Usuario</th>
                    <th className="text-center">Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.users}>
                      <td>{u.users}</td>
                      <td className="text-center">
                        <span className="rol-badge">{u.rol}</span>

                      </td>
                      <td className="text-center">
                        <div className="d-inline-flex gap-1">
                          <button
                            className="btn-azul-mini"
                            onClick={() => abrirModalEditar(u)}
                          >
                            <i className="bi bi-pencil"></i> Editar
                          </button>

                          <button
                            className="btn-celeste-mini"
                            onClick={() => eliminarUsuario(u.users)}
                          >
                            <i className="bi bi-trash"></i> Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted my-5">
              <i className="bi bi-people fs-1"></i>
              <p>No hay usuarios registrados.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Usuarios;
