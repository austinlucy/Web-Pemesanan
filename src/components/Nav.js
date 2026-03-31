import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">Pemesanan Gedung</a>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Beranda
            </a>
          </li>
          <li className="nav-item">
            <a href="/gedung" className="nav-link">
              Cari Gedung
            </a>
          </li>
          <li className="nav-item">
            <a href="/paket" className="nav-link">
              Paket
            </a>
          </li>
          <li className="nav-item">
            <a href="/tentang" className="nav-link">
              Tentang Kami
            </a>
          </li>
          <li className="nav-item">
            <a href="/kontak" className="nav-link">
              Kontak
            </a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link nav-link-btn">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
