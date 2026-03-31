import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [pesananList, setPesananList] = useState([]);
  const [activeTab, setActiveTab] = useState('semua');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = 'admin123'; // Ganti dengan password yang aman

  useEffect(() => {
    loadPesanan();
  }, []);

  const loadPesanan = () => {
    const pesanan = JSON.parse(localStorage.getItem('pesanan') || '[]');
    setPesananList(pesanan.sort((a, b) => new Date(b.tanggalPemesanan) - new Date(a.tanggalPemesanan)));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Password salah!');
    }
  };

  const handleKonfirmasi = (id) => {
    const updatedPesanan = pesananList.map((p) =>
      p.id === id ? { ...p, status: 'confirmed' } : p
    );
    setPesananList(updatedPesanan);
    localStorage.setItem('pesanan', JSON.stringify(updatedPesanan));
  };

  const handleBatalkan = (id) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
      const updatedPesanan = pesananList.filter((p) => p.id !== id);
      setPesananList(updatedPesanan);
      localStorage.setItem('pesanan', JSON.stringify(updatedPesanan));
    }
  };

  const getFilteredPesanan = () => {
    switch (activeTab) {
      case 'pending':
        return pesananList.filter((p) => p.status === 'pending');
      case 'confirmed':
        return pesananList.filter((p) => p.status === 'confirmed');
      default:
        return pesananList;
    }
  };

  const getKalendarData = () => {
    const kalender = {};
    pesananList.forEach((p) => {
      const date = p.tanggalAcara;
      if (!kalender[date]) {
        kalender[date] = [];
      }
      kalender[date].push(p);
    });
    return kalender;
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Admin Dashboard</h1>
          <p>Masukkan password untuk mengakses dashboard</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="login-input"
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredPesanan = getFilteredPesanan();
  const kalendarData = getKalendarData();

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button
          className="logout-btn"
          onClick={() => setIsAuthenticated(false)}
        >
          Logout
        </button>
      </div>

      <div className="admin-container">
        {/* Statistik */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Pesanan</h3>
            <p className="stat-value">{pesananList.length}</p>
          </div>
          <div className="stat-card pending">
            <h3>Menunggu Konfirmasi</h3>
            <p className="stat-value">
              {pesananList.filter((p) => p.status === 'pending').length}
            </p>
          </div>
          <div className="stat-card confirmed">
            <h3>Sudah Dikonfirmasi</h3>
            <p className="stat-value">
              {pesananList.filter((p) => p.status === 'confirmed').length}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'semua' ? 'active' : ''}`}
            onClick={() => setActiveTab('semua')}
          >
            📋 Semua Pesanan ({pesananList.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Menunggu ({pesananList.filter((p) => p.status === 'pending').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'confirmed' ? 'active' : ''}`}
            onClick={() => setActiveTab('confirmed')}
          >
            ✅ Dikonfirmasi ({pesananList.filter((p) => p.status === 'confirmed').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'kalender' ? 'active' : ''}`}
            onClick={() => setActiveTab('kalender')}
          >
            📅 Jadwal Kalender
          </button>
        </div>

        {/* Content */}
        <div className="admin-content">
          {activeTab === 'kalender' ? (
            <div className="kalender-section">
              <h2>Jadwal Kalender Acara</h2>
              <div className="kalender-grid">
                {Object.keys(kalendarData)
                  .sort()
                  .map((date) => (
                    <div key={date} className="kalender-date-card">
                      <h4>📅 {date}</h4>
                      <div className="kalender-events">
                        {kalendarData[date].map((pesanan) => (
                          <div key={pesanan.id} className="kalender-event">
                            <p>
                              <strong>{pesanan.gedung.name}</strong>
                            </p>
                            <p className="event-alamat">{pesanan.gedung.alamat}</p>
                            <p className="event-name">{pesanan.nama}</p>
                            <p className="event-type">{pesanan.jenisAcara}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              {Object.keys(kalendarData).length === 0 && (
                <p className="no-data">Tidak ada jadwal acara</p>
              )}
            </div>
          ) : (
            <div className="pesanan-section">
              {filteredPesanan.length === 0 ? (
                <p className="no-data">Tidak ada pesanan</p>
              ) : (
                <div className="pesanan-table-container">
                  <table className="pesanan-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Gedung</th>
                        <th>Nama/Instansi</th>
                        <th>No HP</th>
                        <th>Jenis Acara</th>
                        <th>Tanggal Acara</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPesanan.map((pesanan, index) => (
                        <tr key={pesanan.id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{pesanan.gedung.name}</strong>
                            <br />
                            <small>{pesanan.gedung.alamat}</small>
                          </td>
                          <td>{pesanan.nama}</td>
                          <td>
                            <a
                              href={`https://wa.me/${pesanan.noHp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whatsapp-link"
                            >
                              {pesanan.noHp}
                            </a>
                          </td>
                          <td>{pesanan.jenisAcara}</td>
                          <td>{pesanan.tanggalAcara}</td>
                          <td>
                            <span
                              className={`status-badge ${pesanan.status}`}
                            >
                              {pesanan.status === 'pending'
                                ? '⏳ Menunggu'
                                : '✅ Dikonfirmasi'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              {pesanan.status === 'pending' && (
                                <button
                                  className="btn-confirm"
                                  onClick={() => handleKonfirmasi(pesanan.id)}
                                >
                                  Konfirmasi
                                </button>
                              )}
                              <button
                                className="btn-delete"
                                onClick={() => handleBatalkan(pesanan.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
