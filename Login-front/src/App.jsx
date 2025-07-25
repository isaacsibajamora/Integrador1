import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import './style/style1.css';
import Productos from './pages/Productos';
import Menu from './components/Menu';
import Ajustes from './pages/Ajustes';
import ProductoU from './pages/ProductoU';
import './style/producto.css';


function App() {
  //return <Login />;
  return <Productos />;
  return <ProductoU/>
  return <Ajustes/>;
  return <Menu/>;
}

export default App;
