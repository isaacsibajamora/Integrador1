const { getStoredToken, refreshZohoToken } = require('../zohoAuth');
const axios = require('axios');

class ZohoInventory {
  constructor(organizationId) {
    this.organizationId = organizationId;
  }

  async getAllItems() {
    let token = getStoredToken();
    if (!token) {
      token = await refreshZohoToken();
    }
    let allItems = [];
    let page = 1;
    const perPage = 200;
    while (true) {
      const apiResponse = await axios.get('https://www.zohoapis.com/inventory/v1/items', {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        params: {
          organization_id: this.organizationId,
          page: page,
          per_page: perPage,
        },
      });
      if (apiResponse.data.code !== 0) {
        throw new Error(`[${apiResponse.data.code}] ${apiResponse.data.message}`);
      }
      // Mostrar estructura de cada item para depuración
      console.log('Ejemplo de item recibido de Zoho:', apiResponse.data.items[0]);
      // Mapear imagen si existe
      const items = apiResponse.data.items.map(item => {
        let image_url = null;
        // Si la API trae la imagen en image_documents, pero solo nombre y tipo
        if (item.image_documents && item.image_documents.length > 0) {
          const doc = item.image_documents[0];
          if (doc.image_document_id) {
            image_url = `/images/${doc.image_document_id}`;
          }
        }
        // Si la API trae la imagen en item.image_url directamente
        if (!image_url && item.image_url) {
          image_url = item.image_url;
        }
        return { ...item, image_url };
      });
      allItems = allItems.concat(items);
      if (items.length < perPage) {
        break;
      }
      page++;
    }
    return allItems;
  }

  // Crear artículo
  async createItem({ name, sku, rate, stock_on_hand }) {
    let token = getStoredToken();
    if (!token) {
      token = await refreshZohoToken();
    }
    const response = await axios.post('https://www.zohoapis.com/inventory/v1/items', {
      organization_id: this.organizationId,
      name,
      sku,
      rate,
      stock_on_hand
    }, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return response.data.item;
  }

  // Editar artículo
  async updateItem(sku, { name, rate, stock_on_hand }) {
    let token = getStoredToken();
    if (!token) {
      token = await refreshZohoToken();
    }
    // Buscar el ID del artículo por SKU
    const items = await this.getAllItems();
    const item = items.find(i => i.sku === sku);
    if (!item) throw new Error('Artículo no encontrado');
    const response = await axios.put(`https://www.zohoapis.com/inventory/v1/items/${item.item_id}`, {
      organization_id: this.organizationId,
      name,
      rate,
      stock_on_hand
    }, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return response.data.item;
  }

  // Eliminar artículo
  async deleteItem(sku) {
    let token = getStoredToken();
    if (!token) {
      token = await refreshZohoToken();
    }
    // Buscar el ID del artículo por SKU
    const items = await this.getAllItems();
    const item = items.find(i => i.sku === sku);
    if (!item) throw new Error('Artículo no encontrado');
    const response = await axios.delete(`https://www.zohoapis.com/inventory/v1/items/${item.item_id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      params: {
        organization_id: this.organizationId
      }
    });
    if (response.data.code !== 0) {
      throw new Error(`[${response.data.code}] ${response.data.message}`);
    }
    return true;
  }
}

module.exports = ZohoInventory;
