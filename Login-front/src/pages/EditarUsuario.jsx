import React, { useState, useEffect } from 'react';
import logo from '../img/injacom-logo-sinfondo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EditarUsuario = ({ cerrarModal, usuarioData }) => {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar datos del usuario seleccionado
  useEffect(() => {
    if (usuarioData) {
      setUsuario(usuarioData.users || '');
      setRol(usuarioData.rol || '');
      setContraseña(''); // no mostrar la contraseña real
    }
  }, [usuarioData]);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      // Construimos el body dinámicamente
      const body = { usuario, rol };
      if (contraseña.trim() !== '') {
        body.contraseña = contraseña;
      }

      const respuesta = await fetch(`http://localhost:3001/api/usuarios/${usuarioData.users}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await respuesta.json();

      if (data.success) {
        setMensaje('✅ Usuario editado con éxito');
        setTimeout(() => {
          setMensaje('');
          cerrarModal();
        }, 1500);
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <>
    
    <div className="modal show" onClick={(e) => { if (e.target.classList.contains('modal')) cerrarModal(); }}>
      <div className="modal-content">
        <span className="close" onClick={cerrarModal}>&times;</span>

        <div className="inj-wrapper">
          <span className="inj-bg-animate"></span>
          <span className="inj-bg-animate2"></span>

          <div className="inj-form-box inj-register">
            <img
              src={logo}
              alt="Logo"
              className="inj-logo inj-animation"
              style={{ "--i": 16, "--j": 0, width: "180px", marginRight: "45px" }}
            />
            <h2 className="inj-animation" style={{ "--i": 17, "--j": 1 }}>
              Editar Usuario
            </h2>

            <form onSubmit={manejarSubmit}>
              <div className="inj-input-box inj-animation" style={{ "--i": 18, "--j": 2 }}>
                <input type="text" required value={usuario} onChange={(e) => setUsuario(e.target.value)}   />
                <label>Usuario</label>
                <i className="bi bi-person-fill" style={{
                  position: "absolute",
                  fontSize: "19px",
                  right: "0px",
                  top: "50%",
                  transform: "translateY(-40%)",
                  color: "#01243a",   // 🔹 aquí lo fuerzas a este color
                  pointerEvents: "none",
                }}></i>
              </div>

              <div
                className="inj-input-box inj-animation"
                style={{ "--i": 18, "--j": 3, position: "relative" }}
              >
                <select
                  required
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "20px 35px 10px 0px", // <- padding-right para espacio al ícono
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    borderBottom: "2px solid #01243a",
                    outline: "none",
                    fontSize: "16px",
                    color: "#01243a",
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled>
                    Seleccione un rol
                  </option>
                  <option value="Administrador">Administrador</option>
                  <option value="Tecnico">Técnico</option>
                  <option value="Vendedor">Vendedor</option>
                </select>

                <i
                  className="bi bi-person-fill"
                  style={{
                    position: "absolute",
                    fontSize: "19px",
                    right: "0px",
                    top: "50%",
                    transform: "translateY(-40%)",
                    color: "#01243a",
                    pointerEvents: "none", // evita que el clic afecte el select
                  }}
                ></i>
              </div>


              <div className="inj-input-box inj-animation" style={{ "--i": 20, "--j": 4 }}>
                <input
                  type="password"
                  placeholder="Nueva contraseña (opcional)"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                <label>Contraseña </label>
                <i className="bi bi-lock-fill" style={{
                  position: "absolute",
                  fontSize: "19px",
                  right: "0px",
                  top: "50%",
                  transform: "translateY(-40%)",
                  color: "#01243a",   // 🔹 aquí lo fuerzas a este color
                  pointerEvents: "none",
                }}></i>
              </div>

              <button type="submit" className="inj-btn inj-animation" style={{ "--i": 21, "--j": 4 }}>
                Guardar Cambios
              </button>

              {mensaje && (
                <p style={{
                  textAlign: 'center',
                  color: mensaje.startsWith('✅') ? 'green' : 'red',
                  marginTop: '10px',
                  fontWeight: 'bold',
                }}>
                  {mensaje}
                </p>
              )}
            </form>
          </div>

          <div className="inj-info-text inj-register">
            <h2 className="inj-animation" style={{ "--i": 17, "--j": 0 }}>
              Editar usuario en Injacom
            </h2>
            <p className="inj-animation" style={{ "--i": 18, "--j": 1 }}>
              Actualiza la información del usuario seleccionado.
            </p>
          </div>
        </div>
      </div>
    </div>
       </>
  );
};

export default EditarUsuario;
