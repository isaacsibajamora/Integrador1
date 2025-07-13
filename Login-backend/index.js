// index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql'); // ← usamos mssql con autenticación SQL Server

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión para SQL Server con autenticación SQL
const dbConfig = {
  user: 'sa',                      // ← tu usuario SQL Server (por ejemplo: 'sa')
  password: '1234',                // ← tu contraseña de SQL Server
  server: 'localhost',             // ← puede ser 'localhost' o tu instancia
  database: 'LoginDB',             // ← tu base de datos
  options: {
    encrypt: false,                // ← false para conexiones locales
    trustServerCertificate: true   // ← necesario para evitar errores SSL
  }
};

// Ruta POST para login
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Conexión a la base de datos
    const pool = await sql.connect(dbConfig);

    // Consulta segura con parámetros
    const result = await pool
      .request()
      .input('usuario', sql.NVarChar, usuario)
      .input('contrasena', sql.NVarChar, contrasena)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario AND contrasena = @contrasena');

    // Verificar si se encontró el usuario
    if (result.recordset.length > 0) {
      const usuarioEncontrado = result.recordset[0];
      res.json({ success: true, rol: usuarioEncontrado.rol });
    } else {
      res.json({ success: false, mensaje: 'Credenciales incorrectas' });
    }

  } catch (error) {
    console.error('❌ Error al procesar el login:', error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
});
