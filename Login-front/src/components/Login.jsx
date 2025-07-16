import React, { useState } from 'react';
import '../style/style1.css';
import logo from '../assets/injacom-logo-sinfondo.png';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await respuesta.json();

      if (data.success) {
        setMensaje(`✅ Bienvenido. Rol: ${data.rol}`);
        // Aquí puedes agregar redirección o guardado en localStorage si quieres
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error en login:', error);
      setMensaje('❌ Error al conectar con el servidor.');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <img src={logo} alt="Injacom Logo" className="nav-logo" />
        </div>
      </nav>

      <div className="wrapper">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

        {/* LOGIN BOX */}
        <div className="form-box login">
          <img
            src={logo}
            alt="Logo"
            className="animation"
            style={{
              '--i': 0,
              '--j': 20,
              width: '180px',
              marginLeft: '45px',
            }}
          />
          <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>
            Inicio de Sesión
          </h2>
          <form onSubmit={manejarSubmit}>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <label>Usuario</label>
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <input
                type="password"
                required
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <label>Contraseña</label>
              <i className="bi bi-lock-fill"></i>
              <a
                href="#"
                style={{
                  textDecoration: 'none',
                  fontSize: '12px',
                  color: '#01243a',
                }}
              >
                {/* Aquí podés agregar "Olvidé mi contraseña" */}
              </a>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ '--i': 3, '--j': 24 }}
            >
              Iniciar Sesión
            </button>
            {mensaje && (
              <p
                style={{
                  textAlign: 'center',
                  color: '#01243a',
                  marginTop: '10px',
                  fontWeight: 'bold',
                }}
              >
                {mensaje}
              </p>
            )}
            <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
              {/* Puedes agregar links para registro o recuperar contraseña */}
            </div>
          </form>
        </div>

        {/* INFO LOGIN */}
        <div className="info-text login">
          <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>
            ¡Bienvenido a Injacom!
          </h2>
          <p className="animation" style={{ '--i': 1, '--j': 21 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>

        {/* El resto de tu componente (registro y otros) queda igual */}
      </div>
    </>
  );
};

export default Login;
