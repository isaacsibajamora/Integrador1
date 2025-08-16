// backend/models/ZohoInventory.js
const { getStoredToken, refreshZohoToken } = require('../zohoAuth');
const axios = require('axios');

class ZohoInventory {
  constructor(organizationId) {
    this.organizationId = organizationId;
  }

  // Traer TODOS los items (paginado), manteniendo image_url si Zoho la trae
  async getAllItems() {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    let allItems = [];
    let page = 1;
    const perPage = 200;

    while (true) {
      let apiResponse;
      try {
        apiResponse = await axios.get('https://www.zohoapis.com/inventory/v1/items', {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
          params: {
            organization_id: this.organizationId,
            page,
            per_page: perPage,
          },
        });
      } catch (err) {
        if (err.response) {
          console.error('❌ Error en respuesta Zoho:', err.response.data);
        } else {
          console.error('❌ Error al llamar a Zoho:', err);
        }
        throw err;
      }

      if (!apiResponse.data || !Array.isArray(apiResponse.data.items)) {
        console.error('❌ Estructura inesperada Zoho:', apiResponse.data);
        throw new Error('Estructura inesperada en respuesta de Zoho');
      }

      // Mapea sin inventar rutas; conserva image_url si existe,
      // y conserva metadatos útiles (image_document_id, image_type)
      const items = apiResponse.data.items
        .map(item => {
          if (!item || typeof item !== 'object') return null;
          return {
            ...item,
            image_url: item.image_url || null,
          };
        })
        .filter(Boolean);

      allItems = allItems.concat(items);

      if (items.length < perPage) break;
      page++;
    }

    return allItems;
  }

  // Trae 1 item por ID
  async getItemById(itemId) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    const resp = await axios.get(`https://www.zohoapis.com/inventory/v1/items/${itemId}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      params: { organization_id: this.organizationId },
    });

    if (!resp.data || !resp.data.item) {
      throw new Error('Item no encontrado en Zoho');
    }
    return resp.data.item;
  }

  // Devuelve el stream de imagen del item. Intenta por /items/:id/image y si falla, por itemimage/:imageDocumentId
  async getItemImageStream({ itemId, imageDocumentId }) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    // Intento 1: endpoint estándar por itemId
    try {
      const resp = await axios.get(
        `https://www.zohoapis.com/inventory/v1/items/${itemId}/image`,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
          params: { organization_id: this.organizationId },
          responseType: 'stream',
        }
      );
      return resp; // resp.data es el stream
    } catch (e) {
      // Intento 2: endpoint alterno por imageDocumentId
      if (!imageDocumentId) throw e;

      const resp2 = await axios.get(
        `https://www.zohoapis.com/inventory/v1/itemimages/${imageDocumentId}`,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
          params: { organization_id: this.organizationId },
          responseType: 'stream',
        }
      );
      return resp2;
    }
  }

  // --- CRUD opcional que ya tenías ---
  async createItem({ name, sku, rate, stock_on_hand }) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    const response = await axios.post(
      'https://www.zohoapis.com/inventory/v1/items',
      { organization_id: this.organizationId, name, sku, rate, stock_on_hand },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return response.data.item;
  }

  async updateItem(sku, { name, rate, stock_on_hand }) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    const items = await this.getAllItems();
    const item = items.find(i => i.sku === sku);
    if (!item) throw new Error('Artículo no encontrado');

    const response = await axios.put(
      `https://www.zohoapis.com/inventory/v1/items/${item.item_id}`,
      { organization_id: this.organizationId, name, rate, stock_on_hand },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return response.data.item;
  }

  async deleteItem(sku) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    const items = await this.getAllItems();
    const item = items.find(i => i.sku === sku);
    if (!item) throw new Error('Artículo no encontrado');

    const response = await axios.delete(
      `https://www.zohoapis.com/inventory/v1/items/${item.item_id}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
        params: { organization_id: this.organizationId },
      }
    );
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return true;
  }
  
  // funcion de la imagen del item
  // Devuelve un stream de la imagen del item, o un error si no se pudo obtener
  async getItemImageStream({ itemId, imageDocumentId }) {
    let token = getStoredToken();
    if (!token) token = await refreshZohoToken();

    const common = {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      params: { organization_id: this.organizationId },
      responseType: 'stream'
    };

    // 1) Estándar por itemId
    try {
      const url1 = `https://www.zohoapis.com/inventory/v1/items/${itemId}/image`;
      const r1 = await axios.get(url1, common);
      return { resp: r1, used: url1 };
    } catch (e1) {
      // continúa
    }

    // 2) Descarga por imageDocumentId (camino típico cuando image_url es null)
    if (imageDocumentId) {
      try {
        const url2 = `https://www.zohoapis.com/inventory/v1/itemimages/${imageDocumentId}/download`;
        const r2 = await axios.get(url2, common);
        return { resp: r2, used: url2 };
      } catch (e2) {
        // 3) Fallback sin /download (algunas cuentas responden aquí)
        try {
          const url3 = `https://www.zohoapis.com/inventory/v1/itemimages/${imageDocumentId}`;
          const r3 = await axios.get(url3, common);
          return { resp: r3, used: url3 };
        } catch (e3) {
          throw e3;
        }
      }
    }

    throw new Error('No fue posible obtener la imagen por ningún endpoint');
  }
}

module.exports = ZohoInventory;
