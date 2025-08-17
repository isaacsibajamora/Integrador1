import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
//import "../style/producto.css";
import "../style/usuarios.css";
import Menu from "../components/Menu";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Registrar from "./Registrar";
import EditarUsuario from "./EditarUsuario"; // importamos el componente de edición

const API_BASE = "http://localhost:3001/api";

const Usuarios = () => {
  const rol = parseInt(localStorage.getItem("rol"));

  // Estados principales
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Modal de registrar / editar
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showClass, setShowClass] = useState(false);

  // Estado para edición
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const abrirModal = () => {
    setUsuarioEditando(null); // nuevo usuario
    setIsClosing(false);
    setModalVisible(true);
    setShowClass(false);
    setTimeout(() => setShowClass(true), 10);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario); // cargamos usuario a editar
    setIsClosing(false);
    setModalVisible(true);
    setShowClass(false);
    setTimeout(() => setShowClass(true), 10);
  };

  const cerrarModal = () => {
    setIsClosing(true);
    setShowClass(false);
    setTimeout(() => {
      setModalVisible(false);
      setIsClosing(false);
      setUsuarioEditando(null);
    }, 400);
  };

  // Obtener usuarios
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setMensaje("❌ No se pudieron cargar los usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Eliminar usuario
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
      <Navbar rol={rol} abrirModal={abrirModal} />
      <Menu />

      {modalVisible && (
        <div
          className={`modal ${showClass ? "show" : ""}`}
          onClick={(e) => {
            if (e.target.classList.contains("modal")) cerrarModal();
          }}
        >
          {/* Abrimos Registrar o EditarUsuario según usuarioEditando */}
          {usuarioEditando ? (
            <EditarUsuario
              cerrarModal={cerrarModal}
              usuarioData={usuarioEditando}
              recargarUsuarios={fetchUsuarios}
            />
          ) : (
            <Registrar
              cerrarModal={cerrarModal}
              recargarUsuarios={fetchUsuarios}
            />
          )}
        </div>
      )}

      <div className="main-content">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">
              <i className="bi bi-people-fill me-2"></i> Gestión de Usuarios
            </h3>
            <button className="btn btn-primary" onClick={abrirModal}>
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
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.users}>
                      <td>{u.users}</td>
                      <td>
                        <span className="badge bg-info text-dark">{u.rol}</span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => abrirModalEditar(u)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarUsuario(u.users)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
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
