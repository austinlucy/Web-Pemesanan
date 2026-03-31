import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const gedungs = [
    {
      id: 1,
      name: 'Gedung Samakai',
      price: 400000,
      alamat: 'Jl. Samakai No. 123, Kota',
      image: '/img/gedung1.jpg'
    },
    {
      id: 2,
      name: 'Gedung Montabaru',
      price: 600000,
      alamat: 'Jl. Montabaru No. 456, Kota',
      image: '/img/gedung2.jpg'
    },
    {
      id: 3,
      name: 'Gedung PKK',
      price: 500000,
      alamat: 'Jl. PKK No. 789, Kota',
      image: '/img/gedung3.jpg'
    },
    {
      id: 4,
      name: 'Gedung Paruka Samakai',
      price: 4000000,
      alamat: 'Jl. Paruka Samakai No. 321, Kota',
      image: '/img/gedung4.jpg'
    }
  ];

  const sopSteps = [
    { number: '1', icon: '🔍', title: 'Cari Gedung', desc: 'Pilih gedung yang sesuai' },
    { number: '2', icon: '📝', title: 'Isi Form', desc: 'Masukkan detail acara' },
    { number: '3', icon: '💬', title: 'Chat WhatsApp', desc: 'Konfirmasi ke admin' },
    { number: '4', icon: '✅', title: 'Konfirmasi', desc: 'Terima persetujuan' }
  ];

  const faqs = [
    {
      q: 'Berapa lama proses konfirmasi?',
      a: 'Proses konfirmasi biasanya 1-2 hari kerja setelah pemesanan.'
    },
    {
      q: 'Apakah bisa membatalkan?',
      a: 'Ya, bisa dibatalkan hingga 7 hari sebelumnya dengan potongan biaya.'
    },
    {
      q: 'Apa saja yang termasuk rental?',
      a: 'Ruangan, AC, sound system dasar, dan tempat parkir gratis.'
    },
    {
      q: 'Ada diskon untuk booking banyak?',
      a: 'Ya, hubungi kami untuk penawaran khusus paket tahunan.'
    }
  ];

  const handlePilihGedung = (gedung) => {
    localStorage.setItem('selectedGedung', JSON.stringify(gedung));
    navigate('/pemesanan');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%), url('/img/gedung1.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-content">
          <h1>Temukan Gedung Impian Anda</h1>
          <p>Pesan gedung untuk acara spesial Anda dengan mudah dan cepat</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/gedung')}>
              🔍 Cari Gedung Sekarang
            </button>
            <a href="https://wa.me/62821234567890?text=Halo%20saya%20ingin%20menanyakan%20info%20pemesanan%20gedung" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Gedung Preview Section */}
      <section className="gedung-section">
        <div className="section-container">
          <h2>Gedung-Gedung Pilihan Kami</h2>
          <p className="section-subtitle">Pilih dari koleksi gedung terbaik untuk acara Anda</p>
          
          <div className="gedung-grid">
            {gedungs.map(gedung => (
              <div key={gedung.id} className="gedung-card">
                <div className="gedung-image">
                  <img src={gedung.image} alt={gedung.name} />
                </div>
                <div className="gedung-content">
                  <h3>{gedung.name}</h3>
                  <p className="gedung-alamat">📍 {gedung.alamat}</p>
                  <div className="gedung-footer">
                    <span className="gedung-price">
                      Rp {(gedung.price / 1000000).toFixed(1)}M/hari
                    </span>
                    <button 
                      className="btn-pesan"
                      onClick={() => handlePilihGedung(gedung)}
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <button className="btn-link" onClick={() => navigate('/gedung')}>
              Lihat Semua Gedung →
            </button>
          </div>
        </div>
      </section>

      {/* SOP Section */}
      <section className="sop-section">
        <div className="section-container">
          <h2>Cara Mudah Pemesanan</h2>
          <p className="section-subtitle">Proses pemesanan yang simpel dalam 4 langkah</p>
          
          <div className="sop-grid">
            {sopSteps.map((step, index) => (
              <div key={index} className="sop-card">
                <div className="sop-number">{step.number}</div>
                <div className="sop-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <button className="btn-link" onClick={() => navigate('/sop')}>
              Lihat Prosedur Lengkap →
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2>Mengapa Pilih Kami?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Harga Kompetitif</h3>
              <p>Harga terjangkau dengan fasilitas berkualitas tinggi untuk semua budget</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Proses Cepat</h3>
              <p>Konfirmasi pesanan hanya dalam 1-2 hari kerja melalui WhatsApp</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Terpercaya</h3>
              <p>Telah melayani ratusan acara dengan kepuasan pelanggan tinggi</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mudah Diakses</h3>
              <p>Platform online yang user-friendly dan responsif di semua perangkat</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Fleksibel</h3>
              <p>Dapat menyesuaikan fasilitas sesuai kebutuhan acara Anda</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Tim Profesional</h3>
              <p>Tim yang berpengalaman siap membantu dari awal hingga akhir acara</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="home-faq-section">
        <div className="section-container">
          <h2>Pertanyaan yang Sering Diajukan</h2>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-toggle ${expandedFaq === index ? 'open' : ''}`}>▼</span>
                </div>
                {expandedFaq === index && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <p>Masih ada pertanyaan?</p>
            <button className="btn-link" onClick={() => navigate('/kontak')}>
              Lihat FAQ Lengkap →
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-container">
          <h2>Hubungi Kami Sekarang</h2>
          <p className="section-subtitle">Siap membantu Anda merencanakan acara sempurna</p>
          
          <div className="contact-grid">
            <div className="contact-box">
              <div className="contact-icon">💬</div>
              <h3>Chat WhatsApp</h3>
              <p>Cara tercepat menghubungi kami</p>
              <a href="https://wa.me/62821234567890?text=Halo%20saya%20ingin%20menanyakan%20info%20pemesanan" target="_blank" rel="noopener noreferrer" className="btn-contact">
                Hubungi di WhatsApp
              </a>
            </div>
            <div className="contact-box">
              <div className="contact-icon">📞</div>
              <h3>Telepon</h3>
              <p>+62 821-2345-67890</p>
              <p className="hours">Senin-Jumat: 09:00-18:00</p>
            </div>
            <div className="contact-box">
              <div className="contact-icon">📍</div>
              <h3>Kantor</h3>
              <p>Jl. Raya Utama No. 123</p>
              <p>Kota</p>
            </div>
          </div>

          <div className="section-cta">
            <button className="btn-link" onClick={() => navigate('/kontak')}>
              Lihat Kontak Lengkap →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="final-cta-section">
        <h2>Jangan Tunda Lagi!</h2>
        <p>Pesan gedung impian Anda sekarang dan wujudkan acara sempurna</p>
        <button className="btn-primary-large" onClick={() => navigate('/gedung')}>
          Mulai Pemesanan Sekarang
        </button>
      </section>
    </div>
  );
};

export default Home;
