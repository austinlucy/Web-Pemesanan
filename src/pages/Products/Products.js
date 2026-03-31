import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  
  // Data 4 gedung utama
  const gedungs = [
    {
      id: 1,
      name: 'Gedung Samakai',
      alamat: 'Jl. Samakai No. 123, Kota',
      image: '/img/gedung1.jpg',
      price: 400000,
    },
    {
      id: 2,
      name: 'Gedung Montabaru',
      alamat: 'Jl. Montabaru No. 456, Kota',
      image: '/img/gedung2.jpg',
      price: 600000,
    },
    {
      id: 3,
      name: 'Gedung PKK',
      alamat: 'Jl. PKK No. 789, Kota',
      image: '/img/gedung3.jpg',
      price: 500000,
    },
    {
      id: 4,
      name: 'Gedung Paruka Samakai',
      alamat: 'Jl. Paruka Samakai No. 321, Kota',
      image: '/img/gedung4.jpg',
      price: 4000000,
    },
  ];

  const handlePilihGedung = (gedung) => {
    // Simpan data gedung yang dipilih di localStorage
    localStorage.setItem('selectedGedung', JSON.stringify(gedung));
    navigate('/pemesanan');
  };

  return (
    <div className="gedungs-page">
      <div className="gedungs-header">
        <h1>Pilih Gedung Untuk Acara Anda</h1>
        <p>Pilih salah satu gedung yang tersedia dan isi form pemesanan</p>
      </div>

      <div className="page-container">
        <div className="gedungs-grid">
          {gedungs.map((gedung) => (
            <div key={gedung.id} className="gedung-card">
              <div className="gedung-image">
                <img src={gedung.image} alt={gedung.name} />
              </div>
              <div className="gedung-content">
                <h3 className="gedung-name">{gedung.name}</h3>
                <p className="gedung-location">📍 {gedung.alamat}</p>
                <div className="gedung-price-section">
                  <span>💰 Harga/Hari</span>
                  <strong>Rp {gedung.price.toLocaleString('id-ID')}</strong>
                </div>
                <button
                  className="gedung-button"
                  onClick={() => handlePilihGedung(gedung)}
                >
                  Pilih & Lanjut Pemesanan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
