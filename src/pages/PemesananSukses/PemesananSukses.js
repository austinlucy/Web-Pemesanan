import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PemesananSukses.css';

const PemesananSukses = () => {
  const navigate = useNavigate();

  return (
    <div className="sukses-page">
      <div className="sukses-container">
        <div className="sukses-icon">✅</div>
        <h1>Pemesanan Berhasil!</h1>
        <p className="sukses-message">
          Terima kasih telah melakukan pemesanan. Admin akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi lebih lanjut.
        </p>
        
        <div className="sukses-steps">
          <h3>Langkah Selanjutnya:</h3>
          <ul>
            <li>✅ Admin akan mengirim pesan WhatsApp untuk konfirmasi</li>
            <li>📞 Tunggu konfirmasi dan detail teknis lainnya</li>
            <li>💳 Selesaikan pembayaran sesuai instruksi admin</li>
            <li>🎉 Acara Anda siap diselenggarakan!</li>
          </ul>
        </div>

        <div className="sukses-actions">
          <button
            className="btn-home"
            onClick={() => navigate('/')}
          >
            Kembali ke Beranda
          </button>
          <button
            className="btn-gedung"
            onClick={() => navigate('/gedung')}
          >
            Pesan Gedung Lain
          </button>
        </div>
      </div>
    </div>
  );
};

export default PemesananSukses;
