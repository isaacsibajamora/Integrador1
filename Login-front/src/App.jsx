// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Ajustes from './pages/Ajustes';
import Productos from './pages/Productos';
import ProductoU from './pages/ProductoU';

function App() {
<<<<<<< HEAD
  //return <Login />;
  return <Productos />;
  return <ProductoU/>
  return <Ajustes/>;
  return <Menu/>;
=======
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productou" element={<ProductoU />} />
      </Routes>
    </Router>
  );
>>>>>>> master
}

export default App;
