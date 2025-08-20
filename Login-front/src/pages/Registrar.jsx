import React, { useState } from 'react';
import logo from '../img/injacom-logo-sinfondo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Registrar = ({ cerrarModal }) => {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrar, setMostrar] = useState(false); // <--- Estado para mostrar/ocultar contraseña
  const [mensaje, setMensaje] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3001/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña, rol }),
      });

      const data = await respuesta.json();

      if (data.success) {
        setMensaje('✅ Usuario registrado con éxito');
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
    <div
      className="modal show"
      onClick={(e) => {
        if (e.target.classList.contains('modal')) cerrarModal();
      }}
    >
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
              style={{ "--i": 16, "--j": 0, width: "180px", marginRight: "45px" }}
            />
            <h2 className="inj-animation" style={{ "--i": 17, "--j": 1 }}>
              Registrar Usuario
            </h2>
            <form onSubmit={manejarSubmit}>
              <div className="inj-input-box inj-animation" style={{ "--i": 18, "--j": 2 }}>
                <input
                  type="text"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
                <label>Usuario</label>
                <i className="bi bi-person-fill"></i>
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




              {/* Campo de contraseña con "ojito" */}
              <div
                className="inj-input-box inj-animation"
                style={{ "--i": 20, "--j": 4, position: "relative" }}
              >
                <input
                  type={mostrar ? 'text' : 'password'}
                  required
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                <label>Contraseña</label>
                <i className="bi bi-lock-fill"></i>
                <span
                  onClick={() => setMostrar(!mostrar)}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '53%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: '16px',
                  }}
                >
                  {mostrar ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                </span>
              </div>

              <button
                type="submit"
                className="inj-btn inj-animation"
                style={{ "--i": 21, "--j": 4 }}
              >
                Registrar
              </button>

              {mensaje && (
                <p
                  style={{
                    textAlign: 'center',
                    color: mensaje.startsWith('✅') ? 'green' : 'red',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {mensaje}
                </p>
              )}
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
  );
};

export default Registrar;
