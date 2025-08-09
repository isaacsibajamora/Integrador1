


const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const ZohoInventory = require('./models/ZohoInventory');

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


// Ruta raíz amigable para pruebas
app.get('/', (req, res) => {
  res.send('Servidor backend de Injacom corriendo. Endpoints disponibles: /api/items, /login');
});

// Endpoint de login SQL
app.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input('usuario', sql.VarChar, usuario)
      .input('contrasena', sql.VarChar, contraseña)
      //.input('rol', sql.VarChar, rol)
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
  const { usuario, contraseña, rol } = req.body;

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
      .input('rol', sql.VarChar, rol)
      .query("INSERT INTO usuarios (users, password, rol) VALUES (@usuario, @contrasena, @rol)");

    res.status(201).json({ success: true, mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
  }
});


// Endpoint para obtener productos desde Zoho
const ORGANIZATION_ID = '751498119'; // Cambia por tu ID real si es necesario
const zohoInventory = new ZohoInventory(ORGANIZATION_ID);
// Endpoint para obtener productos desde Zoho, con búsqueda por nombre y stock > 2
app.get('/api/items', async (req, res) => {
  try {
    const search = req.query.search ? req.query.search.toLowerCase() : '';
    let productos = await zohoInventory.getAllItems();
    if (!Array.isArray(productos)) {
      console.error('❌ La respuesta de Zoho no es un array:', productos);
      return res.status(500).json({ error: 'Respuesta inesperada de Zoho' });
    }
    console.log(`🔎 Productos recibidos de Zoho: ${productos.length}`);
    // Buscar el campo de stock real
    // Mostramos un ejemplo de campos de stock para depuración
    if (productos.length > 0) {
      const ejemplo = productos[0];
      console.log('🔍 Ejemplo de campos de stock:', {
        stock_on_hand: ejemplo.stock_on_hand,
        available_stock: ejemplo.available_stock,
        quantity_in_hand: ejemplo.quantity_in_hand,
        actual_stock: ejemplo.actual_stock,
        status: ejemplo.status,
        name: ejemplo.name
      });
    }
    // Mostrar todos los productos que tengan nombre y coincidan con la búsqueda, sin filtrar por stock
    productos = productos.filter(p => {
      if (!p || typeof p !== 'object') {
        console.warn('⚠️ Producto con formato inesperado:', p);
        return false;
      }
      return p.name && (search === '' || p.name.toLowerCase().includes(search));
    });
    console.log(`🔎 Productos tras filtrar solo por búsqueda: ${productos.length}`);
    res.json(productos);
  } catch (error) {
    if (error.response) {
      console.error('❌ Error al obtener productos de Zoho (respuesta):', error.response.data);
    } else {
      console.error('❌ Error al obtener productos de Zoho:', error);
    }
    res.status(500).json({ error: 'Error al obtener productos de Zoho' });
  }
});

// ✅ NUEVA RUTA PARA SERVIR LA IMAGEN DE UN ITEM
// Esta ruta obtiene la imagen de un item por su ID
// y la devuelve como un stream, con manejo de errores y caché.
app.get('/api/items/:itemId/image', async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await zohoInventory.getItemById(itemId);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    const { resp, used } = await zohoInventory.getItemImageStream({
      itemId,
      imageDocumentId: item.image_document_id,
    });

    // LOG de diagnóstico
    console.log(`[IMG] itemId=${itemId} via=${used} status=${resp.status}`);

    // Tipo de contenido (admite jpg/jpeg/png)
    const contentType =
      resp.headers['content-type'] ||
      (item.image_type ? `image/${String(item.image_type).toLowerCase()}` : 'image/jpeg');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    resp.data.pipe(res);
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.error('❌ IMG error:', status || '', data || error?.message || error);

    // Si es 401/403 probablemente token expirado
    if (status === 401 || status === 403) {
      return res.status(502).json({ error: 'No autorizado al descargar la imagen de Zoho' });
    }

    if (status === 404) {
      return res.status(404).json({ error: 'Imagen no encontrada en Zoho' });
    }

    res.status(500).json({ error: 'No se pudo obtener la imagen del ítem' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
});
