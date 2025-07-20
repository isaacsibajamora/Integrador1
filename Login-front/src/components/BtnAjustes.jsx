import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BtnAjustes = ({ contenidoRef }) => {
    const [fontSize, setFontSize] = useState(1);

    const toggleClase = (clase) => {
        const body = document.body;
        body.classList.toggle(clase);
    }

    const cambiarTamanoFuente = (accion) => {
        const nuevoTamano = accion === 'aumentar' ? fontSize + 0.1 : Math.max(0.8, fontSize - 0.1);
        setFontSize(nuevoTamano);
        // Aplica el tamaño al contenido referenciado si está disponible
        if (contenidoRef?.current) {
            contenidoRef.current.style.fontSize = `${nuevoTamano}em`;
        } else {
            // Fallback: aplica a todo el body
            document.body.style.fontSize = `${nuevoTamano}em`;
        }
    }

    return (
        <div className="opciones-accesibilidad">
            <button onClick={() => toggleClase('contraste')}>Contraste Oscuro</button>
            <button onClick={() => toggleClase('resaltado')}>Resaltar enlaces</button>
            <button onClick={() => toggleClase('espaciado-texto')}>Espaciado de texto</button>
            <button onClick={() => cambiarTamanoFuente('aumentar')}>Agrandar texto</button>
            <button onClick={() => cambiarTamanoFuente('disminuir')}>Reducir texto</button>
        </div>
    );
}
export default BtnAjustes;