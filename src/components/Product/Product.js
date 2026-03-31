import React from 'react';
import './Product.css';

const Product = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-badge">{product.category}</div>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-location">
          📍 {product.location}
        </p>
        <p className="product-description">{product.description}</p>
        <div className="product-info">
          <div className="product-capacity">
            <span>👥 Kapasitas</span>
            <strong>{product.capacity} orang</strong>
          </div>
          <div className="product-price">
            <span>💰 Harga</span>
            <strong>Rp {product.price.toLocaleString('id-ID')}</strong>
          </div>
        </div>
        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(product.rating)}</span>
          <span className="rating-value">({product.review} review)</span>
        </div>
        <button className="product-button">Lihat Detail</button>
      </div>
    </div>
  );
};

export default Product;
