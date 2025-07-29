// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/style1.css'; // si tienes uno global

// Navbar o menú global (si existe)
import Menu from './components/Menu'; // opcional si lo usas fuera de páginas

// Páginas (lazy loading)
const Login = lazy(() => import('./pages/Login'));
const Ajustes = lazy(() => import('./pages/Ajustes'));
const Productos = lazy(() => import('./pages/Productos'));
const ProductoU = lazy(() => import('./pages/ProductoU'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>}>
        
        {/* Menú global si quieres que esté en todas las páginas */}
        {/* <Menu /> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/productou" element={<ProductoU />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
