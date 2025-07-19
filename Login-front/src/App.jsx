import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import './style/style1.css';
import Productos from './components/Productos';
import Destacado from './components/Destacado';
import Menu from './components/Menu';
import './style/producto.css';


function App() {
  //return <Login />;
return <Productos />;
   return <Destacado />;
  return <Menu/>;
}

export default App;
