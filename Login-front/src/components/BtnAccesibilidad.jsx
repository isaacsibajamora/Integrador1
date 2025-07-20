import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BtnAccesibilidad = ({contenidoRef}) => {
    const [fontSize, setFontSize] = useState(1);
    const toggleClase = (clase) => {
        document.body.classList.toggle(clase);
    }
    const cambiarTamanoFuente = (accion) => {
        const nuevoTamano = accion === 'aumentar' ? fontSize + 0.1 : Math.max(1,fontSize - 0.1);
        setFontSize(nuevoTamano);
        document.body.style.fontSize = `${nuevoTamano}em`;
    }
    const leerContenido = () => {
        if (contenidoRef.current) {
            const texto = contenidoRef.current.innerText;
            const voz = new SpeechSynthesisUtterance(texto);
            voz.lang = 'es-ES'; // Configura el idioma a español
            window.speechSynthesis.cancel(); // Detiene cualquier lectura previa
            window.speechSynthesis.speak(voz); // Inicia la lectura del texto
        }
    }
    const detenerLectura = () => {
        window.speechSynthesis.cancel(); // Detiene la lectura actual
    }  

    return (
        <>
        <div className="opciones-accesibilidad">
            <button onClick={() => toggleClase('contraste')}>Contraste Oscuro</button>
            <button onClick={() => toggleClase('resaltado')}>Resaltar enlace</button>
            <button onClick={() => cambiarTamanoFuente('aumentar')}>Agrandar texto</button>
            <button onClick={() => cambiarTamanoFuente('disminuir')}>Reducir texto</button>
            <button onClick={() => toggleClase('espaciado-texto')}>Espaciado de texto</button>
            <button onClick={() => toggleClase('cursor-grande')}>Activar cursor</button>
            <button onClick={() => toggleClase('saturacion')}>Activar saturación</button>
            <button onClick={leerContenido}>Leer contenido principal</button>
            <button onClick={detenerLectura}>Detener lectura</button>
        </div>
        </>
    );
}

export default BtnAccesibilidad;