import React, { useState } from 'react';
import logo from '../img/injacom-logo-sinfondo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Registrar = ({ cerrarModal }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3001/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña }),
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
    <div className="modal show" onClick={(e) => {
      if (e.target.classList.contains('modal')) cerrarModal();
    }}>
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

              <div className="inj-input-box inj-animation" style={{ "--i": 20, "--j": 4 }}>
                <input
                  type="password"
                  required
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
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
