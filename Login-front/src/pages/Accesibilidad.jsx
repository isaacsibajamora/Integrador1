import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import BtnAccesibilidad from '../components/BtnAccesibilidad';

const Accesibilidad = () => {
    const contenidoRef = React.useRef(null);

    return (
        <>
            <div className="pagina-accesibilidad container my-5">
                <h1>Centro de Accesibilidad</h1>
                <BotonesAccesibilidad contenidoRef={contenidoRef} />
            </div>
        </>
    );
}

export default Accesibilidad;