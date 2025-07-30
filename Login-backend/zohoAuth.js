require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuración Zoho
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const TOKEN_FILE = path.join(__dirname, 'zoho_token.json');

async function refreshZohoToken() {
  try {
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
      },
    });

    const accessToken = response.data.access_token;

    // Guardar token en archivo
    fs.writeFileSync(
      TOKEN_FILE,
      JSON.stringify(
        {
          access_token: accessToken,
          updated_at: new Date().toISOString(),
        },
        null,
        2
      )
    );

    console.log('✅ Token actualizado correctamente');
    return accessToken;
  } catch (error) {
    console.error('❌ Error actualizando el token:', error.response?.data || error.message);
    throw error;
  }
}

function getStoredToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const data = fs.readFileSync(TOKEN_FILE, 'utf-8');
    const tokenData = JSON.parse(data);
    const updatedAt = new Date(tokenData.updated_at);
    const now = new Date();
    const diffInMinutes = (now - updatedAt) / (1000 * 60);

    // Si han pasado más de 50 minutos, forzar refresco
    if (diffInMinutes > 50) {
      return null;
    }
    return tokenData.access_token;
  }
  return null;
}

module.exports = {
  getStoredToken,
  refreshZohoToken,
};


