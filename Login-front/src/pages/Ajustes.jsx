import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BtnAjustes from '../components/BtnAjustes';
import '../style/ajustes.css';

const Ajustes = () => {
    const contenidoRef = React.useRef(null);

    return (
        <>
            <div className="pagina-accesibilidad container my-5" ref={contenidoRef}>
                <h1>Ajustes</h1>
                <BtnAjustes contenidoRef={contenidoRef} />
            </div>
        </>
    );
}

export default Ajustes;