// src/components/Login.jsx
import React from 'react';
import '../style/style1.css';
import logo from '../assets/injacom-logo-sinfondo.png';

const Login = () => {
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
          <form action="#">
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <input type="text" required />
              <label>Usuario</label>
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <input type="password" required />
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
                
              </a>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ '--i': 3, '--j': 24 }}
            >
              Iniciar Sesión
            </button>
            <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
             
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

        {/* REGISTER BOX */}
        <div className="form-box register">
          <img
            src={logo}
            alt="Logo"
            className="logo animation"
            style={{
              '--i': 16,
              '--j': 0,
              width: '180px',
              marginRight: '45px',
            }}
          />
          <h2 className="animation" style={{ '--i': 17, '--j': 1 }}>
            Registro
          </h2>
          <form action="#">
            <div className="input-box animation" style={{ '--i': 18, '--j': 2 }}>
              <input type="text" required />
              <label>Usuario</label>
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 19, '--j': 3 }}>
              <input type="text" required />
              <label>Email</label>
              <i className="bi bi-envelope-fill"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 20, '--j': 4 }}>
              <input type="password" required />
              <label>Contraseña</label>
              <i className="bi bi-lock-fill"></i>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ '--i': 21, '--j': 4 }}
            >
              Sign Up
            </button>
            <div className="logreg-link animation" style={{ '--i': 22, '--j': 5 }}>
              <p>
                ¿Ya tiene una cuenta?{' '}
                <a href="#" className="login-link">
                  Inicia Sesión
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* INFO REGISTER */}
        <div className="info-text register">
          <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>
            Bienvenido a Injacom
          </h2>
          <p className="animation" style={{ '--i': 18, '--j': 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
