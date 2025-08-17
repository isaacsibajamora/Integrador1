// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/style1.css'; // si tienes uno global

// Navbar o menú global (si existe)
import Menu from './components/Menu'; 

// Páginas (lazy loading)
const Login = lazy(() => import('./pages/Login'));
const Ajustes = lazy(() => import('./pages/Ajustes'));
const Productos = lazy(() => import('./pages/Productos'));
const ProductoU = lazy(() => import('./pages/ProductoU'));
const Usuarios = lazy(() => import('./pages/Usuarios')); // 
const Logout = lazy(() => import('./pages/Logout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/productou" element={<ProductoU />} />
          <Route path="/usuarios" element={<Usuarios />} /> 
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
