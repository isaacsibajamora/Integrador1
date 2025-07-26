// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Ajustes from './pages/Ajustes';
import Productos from './pages/Productos';
import ProductosU from './pages/ProductosU';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productosu" element={<ProductoU />} />
      </Routes>
    </Router>
  );
}

export default App;
