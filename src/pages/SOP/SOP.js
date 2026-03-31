import React, { useState } from 'react';
import './SOP.css';

const SOP = () => {
  const [expandedStep, setExpandedStep] = useState(0);

  const sopSteps = [
    {
      id: 1,
      number: '1',
      title: 'Buka Halaman Pemesanan',
      description: 'Kunjungi website kami dan buka halaman "Cari Gedung" untuk melihat daftar gedung yang tersedia.',
      icon: '🔍',
      details: [
        'Akses website dari perangkat Anda',
        'Klik menu "Cari Gedung" di navigasi',
        'Lihat daftar gedung dengan foto dan harga',
        'Bandingkan fasilitas masing-masing gedung'
      ]
    },
    {
      id: 2,
      number: '2',
      title: 'Pilih Gedung yang Diinginkan',
      description: 'Pilih gedung yang sesuai dengan kebutuhan dan budget acara Anda.',
      icon: '🏛️',
      details: [
        'Perhatikan lokasi dan aksesibilitas',
        'Cek fasilitas yang disediakan',
        'Bandingkan harga per hari',
        'Klik tombol "Pesan Sekarang"'
      ]
    },
    {
      id: 3,
      number: '3',
      title: 'Isi Form Pemesanan',
      description: 'Isi formulir dengan data pribadi dan detail acara Anda.',
      icon: '📝',
      details: [
        'Masukkan nama lengkap/instansi',
        'Masukkan nomor HP/WhatsApp aktif',
        'Pilih jenis acara dari daftar',
        'Tentukan tanggal acara yang diinginkan',
        'Centang konfirmasi bahwa data sudah benar'
      ]
    },
    {
      id: 4,
      number: '4',
      title: 'Konfirmasi ke Admin via WhatsApp',
      description: 'Sistem akan membuka WhatsApp dengan pesan otomatis untuk konfirmasi ke admin.',
      icon: '💬',
      details: [
        'Klik tombol "Konfirmasi" di form',
        'Pesan otomatis akan terbuat dengan detail pesanan',
        'WhatsApp akan terbuka otomatis',
        'Kirim pesan ke nomor admin',
        'Admin akan membalas dalam waktu 1-2 hari kerja'
      ]
    },
    {
      id: 5,
      number: '5',
      title: 'Terima Konfirmasi dari Admin',
      description: 'Admin akan mengirimkan konfirmasi ketersediaan dan detail pembayaran.',
      icon: '✅',
      details: [
        'Admin akan memverifikasi ketersediaan gedung',
        'Admin akan mengirimkan detail biaya lengkap',
        'Penawaran berlaku untuk 3 hari ke depan',
        'Admin akan memberikan informasi metode pembayaran',
        'Tanyakan jika ada pertanyaan atau request khusus'
      ]
    },
    {
      id: 6,
      number: '6',
      title: 'Lakukan Pembayaran',
      description: 'Lakukan pembayaran sesuai dengan instruksi dari admin.',
      icon: '💳',
      details: [
        'Pilih metode pembayaran (Transfer Bank, Cash)',
        'Waktu pembayaran bisa langsung atau cicilan',
        'Konfirmasi pembayaran ke admin',
        'Tunggu bukti pembayaran dari admin',
        'Simpan bukti untuk arsip Anda'
      ]
    },
    {
      id: 7,
      number: '7',
      title: 'Surat Perjanjian & Mobilisasi',
      description: 'Tanda tangan surat perjanjian dan persiapan hari H.',
      icon: '📋',
      details: [
        'Admin akan mengirimkan draft surat perjanjian',
        'Tanda tangan surat perjanjian jika diperlukan',
        'Koordinasi detail untuk hari H',
        'Bahas kebutuhan khusus jika ada',
        'Konfirmasi jumlah peserta akhir'
      ]
    },
    {
      id: 8,
      number: '8',
      title: 'Hari Acara - Serah Terima',
      description: 'Hari pelaksanaan acara dan serah terima kunci gedung.',
      icon: '🎉',
      details: [
        'Tiba di lokasi 30 menit sebelum acara',
        'Serah terima kunci dan perlengkapan',
        'Pengecekan kondisi awal ruangan',
        'Cek semua fasilitas dan keamanan',
        'Nomor darurat admin tersedia 24 jam'
      ]
    },
    {
      id: 9,
      number: '9',
      title: 'Selesai Acara - Pengembalian',
      description: 'Acara selesai, pengembalian barang dan kunci.',
      icon: '🔑',
      details: [
        'Upayakan kondisi ruangan tetap rapi',
        'Kembalikan kunci ke admin',
        'Pengecekan barang bawaan dan kerusakan',
        'Serahkan formulir feedback jika ada',
        'Ucapkan terima kasih dan farewell'
      ]
    }
  ];

  const requirements = [
    { icon: '📱', title: 'Nomor Aktif', description: 'Telepon/WhatsApp aktif untuk koordinasi' },
    { icon: '🆔', title: 'Identitas Valid', description: 'KTP atau identitas yang sah saat tanda tangan' },
    { icon: '💰', title: 'DP/Pembayaran', description: 'Sebagian atau penuh sesuai kesepakatan' },
    { icon: '⏰', title: 'Waktu Cukup', description: 'Berikan waktu minimal 2 minggu sebelum acara' }
  ];

  return (
    <div className="sop-page">
      {/* Header */}
      <div className="sop-hero">
        <div className="sop-hero-content">
          <h1>Standar Operasional Pemesanan (SOP)</h1>
          <p>Panduan lengkap proses pemesanan gedung dari awal hingga akhir</p>
        </div>
      </div>

      <div className="sop-container">
        {/* Quick Start */}
        <section className="quick-start">
          <h2>Mulai Pemesanan Sekarang</h2>
          <div className="quick-links">
            <a href="/gedung" className="quick-link-btn">
              <span className="link-icon">🔍</span>
              <span>Lihat Gedung</span>
            </a>
            <a href=" https://wa.me/62821234567890?text=Halo%20saya%20ingin%20menanyakan%20info%20pemesanan%20gedung" target="_blank" rel="noopener noreferrer" className="quick-link-btn whatsapp">
              <span className="link-icon">💬</span>
              <span>Chat WhatsApp</span>
            </a>
            <a href="/kontak" className="quick-link-btn">
              <span className="link-icon">📞</span>
              <span>Hubungi Kami</span>
            </a>
          </div>
        </section>

        {/* Persyaratan */}
        <section className="requirements-section">
          <h2>Persyaratan Pemesanan</h2>
          <div className="requirements-grid">
            {requirements.map((req, index) => (
              <div key={index} className="requirement-card">
                <div className="req-icon">{req.icon}</div>
                <h3>{req.title}</h3>
                <p>{req.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOP Steps */}
        <section className="sop-steps-section">
          <h2>Langkah-Langkah Pemesanan</h2>
          <div className="sop-steps">
            {sopSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`sop-step-card ${expandedStep === index ? 'expanded' : ''}`}
              >
                <div 
                  className="sop-step-header"
                  onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}
                >
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div className="step-toggle">▼</div>
                </div>
                
                {expandedStep === index && (
                  <div className="sop-step-details">
                    <ul className="details-list">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>
                          <span className="checkmark">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sop-cta">
          <h2>Siap Merencanakan Acara Anda?</h2>
          <p>Hubungi kami sekarang melalui WhatsApp atau datang langsung ke kantor kami</p>
          <div className="cta-buttons">
            <a href="https://wa.me/62821234567890?text=Halo%20saya%20ingin%20merencanakan%20acara" target="_blank" rel="noopener noreferrer" className="cta-btn primary">
              💬 Chat WhatsApp
            </a>
            <a href="/kontak" className="cta-btn secondary">
              📞 Lihat Kontak Lengkap
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SOP;
