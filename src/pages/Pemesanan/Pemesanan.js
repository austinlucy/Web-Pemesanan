import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pemesanan.css';

const Pemesanan = () => {
  const navigate = useNavigate();
  const [selectedGedung, setSelectedGedung] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    noHp: '',
    jenisAcara: '',
    tanggalAcara: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // List jenis acara
  const jenisAcara = [
    'Pernikahan',
    'Acara Korporat',
    'Seminar',
    'Workshop',
    'Gathering',
    'Konser',
    'Pesta',
    'Lainnya',
  ];

  useEffect(() => {
    // Ambil data gedung dari localStorage
    const gedung = localStorage.getItem('selectedGedung');
    if (gedung) {
      setSelectedGedung(JSON.parse(gedung));
    } else {
      navigate('/gedung');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.nama.trim()) {
      setError('Nama/Instansi harus diisi');
      return false;
    }
    if (!formData.noHp.trim()) {
      setError('No HP/WhatsApp harus diisi');
      return false;
    }
    if (!formData.jenisAcara) {
      setError('Jenis Acara harus dipilih');
      return false;
    }
    if (!formData.tanggalAcara) {
      setError('Tanggal Acara harus diisi');
      return false;
    }
    return true;
  };

  const handleKonfirmasi = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simpan pemesanan ke localStorage
      const pesanan = {
        id: Date.now(),
        ...formData,
        gedung: selectedGedung,
        status: 'pending',
        tanggalPemesanan: new Date().toISOString(),
      };

      const pesananList = JSON.parse(localStorage.getItem('pesanan') || '[]');
      pesananList.push(pesanan);
      localStorage.setItem('pesanan', JSON.stringify(pesananList));

      // Format pesan untuk WhatsApp
      const pesanWhatsApp = `
Halo Admin, saya ingin melakukan pemesanan gedung:

*Gedung:* ${selectedGedung.name}
*Alamat:* ${selectedGedung.alamat}
*Harga/Hari:* Rp ${selectedGedung.price.toLocaleString('id-ID')}
*Nama/Instansi:* ${formData.nama}
*No HP/WhatsApp:* ${formData.noHp}
*Jenis Acara:* ${formData.jenisAcara}
*Tanggal Acara:* ${formData.tanggalAcara}

Hormat,
${formData.nama}
      `.trim();

      // Redirect ke WhatsApp (Ganti NOMOR_ADMIN dengan nomor sebenarnya)
      const nomorAdmin = '62821234567890'; // Ganti dengan nomor admin sebenarnya
      const urlWhatsApp = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanWhatsApp)}`;
      
      window.open(urlWhatsApp, '_blank');

      // Tampilkan notifikasi
      alert('Pemesanan berhasil! Anda akan diarahkan ke WhatsApp admin.');
      
      // Reset form
      setFormData({
        nama: '',
        noHp: '',
        jenisAcara: '',
        tanggalAcara: '',
      });

      // Redirect ke halaman success
      setTimeout(() => {
        navigate('/pemesanan-sukses');
      }, 1500);
    } catch (err) {
      setError('Terjadi kesalahan saat memproses pemesanan');
    } finally {
      setLoading(false);
    }
  };

  const handleGantiGedung = () => {
    localStorage.removeItem('selectedGedung');
    navigate('/gedung');
  };

  if (!selectedGedung) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="pemesanan-page">
      <div className="pemesanan-header">
        <h1>Form Pemesanan Gedung</h1>
        <p>Lengkapi data di bawah ini untuk melakukan pemesanan</p>
      </div>

      <div className="page-container">
        <div className="pemesanan-container">
          {/* Gedung yang dipilih */}
          <div className="gedung-selected-card">
            <h3>Gedung yang Dipilih</h3>
            <div className="selected-gedung-info">
              <img src={selectedGedung.image} alt={selectedGedung.name} />
              <div className="selected-gedung-details">
                <h4>{selectedGedung.name}</h4>
                <p className="alamat-detail">📍 {selectedGedung.alamat}</p>
                <div className="selected-gedung-specs">
                  <span>💰 Rp {selectedGedung.price.toLocaleString('id-ID')}/hari</span>
                </div>
                <button
                  className="ganti-gedung-btn"
                  onClick={handleGantiGedung}
                >
                  Ganti Gedung
                </button>
              </div>
            </div>
          </div>

          {/* Form Pemesanan */}
          <form onSubmit={handleKonfirmasi} className="pemesanan-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="nama">Nama/Instansi *</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama atau nama instansi Anda"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="noHp">No HP/WhatsApp *</label>
              <input
                type="tel"
                id="noHp"
                name="noHp"
                value={formData.noHp}
                onChange={handleInputChange}
                placeholder="Contoh: 62821234567890"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jenisAcara">Jenis Acara *</label>
              <select
                id="jenisAcara"
                name="jenisAcara"
                value={formData.jenisAcara}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">-- Pilih Jenis Acara --</option>
                {jenisAcara.map((jenis) => (
                  <option key={jenis} value={jenis}>{jenis}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tanggalAcara">Tanggal Acara *</label>
              <input
                type="date"
                id="tanggalAcara"
                name="tanggalAcara"
                value={formData.tanggalAcara}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className="konfirmasi-button"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Konfirmasi & Hubungi WhatsApp Admin'}
            </button>

            <p className="form-note">
              * Klik tombol di atas untuk langsung menghubungi WhatsApp admin dengan detail pemesanan Anda
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pemesanan;
