import React, { useState } from 'react';
import '../style/producto.css';
import logo from '../img/injacom-logo-sinfondo.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrar, setMostrar] = useState(false); // <--- Estado para mostrar/ocultar contraseña
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña, rol }),
      });

      const data = await respuesta.json();

      if (data.success) {
        setMensaje(`✅ Bienvenido. Rol: ${data.rol}`);
        navigate('/Productos');
        localStorage.setItem('rol', data.rol);
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

        <div className="form-box login">
          <img
            src={logo}
            alt="Logo"
            className="animation"
            style={{ '--i': 0, '--j': 20, width: '180px', marginLeft: '45px' }}
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

            <div className="input-box animation" style={{ '--i': 2, '--j': 24, position: 'relative' }}>
              <input
                type={mostrar ? 'text' : 'password'} // <--- aquí cambia el tipo según el estado
                required
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <label>Contraseña</label>
              <i className="bi bi-lock-fill"></i>
              {/* Botón del "ojito" */}
              <span
                onClick={() => setMostrar(!mostrar)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '55%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: '16px',
                }}
              >
                {mostrar ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
              </span>
            </div>

            <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>
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
          </form>
        </div>

        <div className="info-text login">
          <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>¡Bienvenido a Injacom!</h2>
          <p className="animation" style={{ '--i': 1, '--j': 21 }}>
            Tecnología confiable y soluciones a tu alcance.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
