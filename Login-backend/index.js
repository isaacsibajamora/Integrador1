const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'projectint',
  password: 'qpal1029',
  server: 'localhost',
  database: 'loginbd',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Ruta login
app.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input('usuario', sql.VarChar, usuario)
      .input('contrasena', sql.VarChar, contraseña)
      .query('SELECT * FROM usuarios WHERE users = @usuario AND password = @contrasena');

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

// Ruta registrar
app.post('/registrar', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Verificar si usuario ya existe
    const check = await pool
      .request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT * FROM usuarios WHERE users = @usuario');

    if (check.recordset.length > 0) {
      return res.status(409).json({ success: false, mensaje: 'Usuario ya registrado' });
    }

    // Insertar nuevo usuario
    await pool
      .request()
      .input('usuario', sql.VarChar, usuario)
      .input('contrasena', sql.VarChar, contraseña)
      .query("INSERT INTO usuarios (users, password) VALUES (@usuario, @contrasena)");

    res.status(201).json({ success: true, mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
});
