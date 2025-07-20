import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BtnAjustes = ({contenidoRef}) => {
    const [fontSize, setFontSize] = useState(1);
    const toggleClase = (clase) => {
        document.body.classList.toggle(clase);
    }
    const cambiarTamanoFuente = (accion) => {
        const nuevoTamano = accion === 'aumentar' ? fontSize + 0.1 : Math.max(1,fontSize - 0.1);
        setFontSize(nuevoTamano);
        document.body.style.fontSize = `${nuevoTamano}em`;
    }

    return (
        <>
        <div className="opciones-accesibilidad">
            <button onClick={() => toggleClase('contraste')}>Contraste Oscuro</button>
            <button onClick={() => cambiarTamanoFuente('aumentar')}>Agrandar texto</button>
            <button onClick={() => cambiarTamanoFuente('disminuir')}>Reducir texto</button>
        </div>
        </>
    );
}

export default BtnAjustes;