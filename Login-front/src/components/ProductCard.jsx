import React from 'react';
import './productCard.css';

const ProductCard = ({ name, sku, rate, stock_on_hand, image_url }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 product-card">
        {image_url && (
          <img src={image_url} className="card-img-top product-img" alt={name} />
        )}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"><strong>SKU:</strong> {sku}</p>
          <p className="card-text"><strong>Precio:</strong> ${rate}</p>
          <p className="card-text"><strong>Stock:</strong> {stock_on_hand}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
