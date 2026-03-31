import React, { useState } from 'react';
import './Kontak.css';

const Kontak = () => {
  const [activeTab, setActiveTab] = useState('kontak');

  const whatsappNumber = '62821234567890';
  const whatsappMessage = 'Halo, saya ingin menanyakan informasi tentang pemesanan gedung.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const contactData = [
    {
      id: 1,
      icon: '📞',
      title: 'Telepon',
      value: '+62 821-2345-67890',
      description: 'Hubungi kami via telepon'
    },
    {
      id: 2,
      icon: '📧',
      title: 'Email',
      value: 'info@pemesanangendung.com',
      description: 'Kirimkan email untuk pertanyaan'
    },
    {
      id: 3,
      icon: '📍',
      title: 'Alamat',
      value: 'Jl. Raya Utama No. 123, Kota',
      description: 'Kunjungi kantor kami'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'Berapa lama proses konfirmasi pesanan?',
      answer: 'Proses konfirmasi pesanan biasanya memakan waktu 1-2 hari kerja setelah Anda melakukan pemesanan melalui WhatsApp.'
    },
    {
      id: 2,
      question: 'Apakah bisa membatalkan pesanan?',
      answer: 'Ya, Anda dapat membatalkan pesanan hingga 7 hari sebelum tanggal acara dengan potongan biaya sesuai kebijakan yang berlaku.'
    },
    {
      id: 3,
      question: 'Apa saja yang sudah termasuk dalam biaya rental?',
      answer: 'Biaya rental mencakup penggunaan ruangan, AC, sound system dasar, dan kami juga menyediakan tempat parkir gratis untuk tamu.'
    },
    {
      id: 4,
      question: 'Apakah ada diskon untuk pemesanan paket tahunan?',
      answer: 'Ya, kami menawarkan diskon khusus untuk pemesanan paket tahunan atau booking untuk multiple events. Hubungi kami untuk penawaran terbaik.'
    }
  ];

  const [expandedFaqId, setExpandedFaqId] = useState(null);

  return (
    <div className="kontak-page">
      {/* Header */}
      <div className="kontak-hero">
        <div className="kontak-hero-content">
          <h1>Hubungi Kami</h1>
          <p>Tim kami siap membantu Anda dalam merencanakan acara sempurna</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="kontak-tabs">
        <button 
          className={`tab-btn ${activeTab === 'kontak' ? 'active' : ''}`}
          onClick={() => setActiveTab('kontak')}
        >
          Kontak Kami
        </button>
        <button 
          className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      <div className="kontak-container">
        {activeTab === 'kontak' && (
          <>
            {/* WhatsApp Section */}
            <div className="whatsapp-section">
              <div className="whatsapp-card">
                <div className="whatsapp-icon-container">
                  <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6915026,13.4744748 C17.4744161,13.2989012 17.1917333,13.2989012 16.9746469,13.4744748 L15.9474358,14.3444457 C15.75,14.4799905 15.4780139,14.4599686 15.380248,14.2243326 C15.1625167,13.7001699 14.8799935,13.1119801 14.4121271,12.5241721 C14.0915502,12.1593909 13.7659465,11.8191528 13.4744748,11.5249045 L14.4744748,10.5249045 C14.6915612,10.3087681 14.6915612,10.0271252 14.4744748,9.81088876 L13.1945316,8.53054437 C12.9944707,8.33048397 12.6858614,8.33048397 12.4858005,8.53054437 L11.2394581,9.77688179 C11.0424128,9.97393545 10.7234602,10.0251471 10.4585826,9.95163444 C9.35191417,9.61807216 8.41593922,8.91743059 7.65375097,7.95847455 C7.09948481,7.25135202 6.71862719,6.54017462 6.45470348,5.79760524 C6.35702799,5.52931812 6.40749225,5.20968435 6.60672842,5.01311953 L7.8319077,3.78787629 C8.03248673,3.58726949 8.03248673,3.27869206 7.8319077,3.07808526 L6.55218649,1.79836405 C6.35201618,1.59819374 6.04340068,1.59819374 5.84323037,1.79836405 L4.59375097,3.04784345 C4.34067971,3.30091471 4.18846043,3.63930688 4.25192192,3.98126948 C4.75640595,6.74612565 6.05147424,9.02500695 8.20064035,10.8247722 C10.1564368,12.4515197 12.6146842,13.5902694 15.1946626,13.9191942 C15.5365823,13.9826557 15.8743328,13.8304406 16.1273895,13.5773839 L17.3768688,12.3279046 C17.5770291,12.1278443 17.8856384,12.1278443 18.0856987,12.3279046 L19.3656419,13.6078477 C19.5657022,13.8078979 19.5657022,14.1164872 19.3656419,14.3165475 L17.6915026,13.4744748 Z M12,1 C6.48716254,1 2,5.48749219 2,11.0016492 C2,12.6563168 2.41048957,14.2155237 3.16888148,15.6611205 L2.06286554,20.0151496 C1.82133083,20.8867896 2.70935571,21.7749144 3.58099574,21.5333814 L8.0394567,20.4270986 C9.48513508,21.1849425 11.0446385,21.5902694 12.6596351,21.5902694 C18.1728575,21.5902694 22.6599499,17.1027772 22.6599499,11.5886199 C22.6599499,6.07450256 18.1728575,1 12,1 Z"/>
                  </svg>
                </div>
                <h2>Hubungi via WhatsApp</h2>
                <p className="whatsapp-description">
                  Cara tercepat dan termudah untuk menanyakan ketersediaan gedung dan memesan
                </p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                  <span>💬 Chat WhatsApp</span>
                </a>
                <p className="whatsapp-number">+62 821-2345-67890</p>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="contact-details">
              <h2>Informasi Kontak Lainnya</h2>
              <div className="contact-grid">
                {contactData.map(contact => (
                  <div key={contact.id} className="contact-card">
                    <div className="contact-icon">{contact.icon}</div>
                    <h3>{contact.title}</h3>
                    <p className="contact-value">{contact.value}</p>
                    <p className="contact-description">{contact.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="business-hours">
              <h2>Jam Operasional</h2>
              <div className="hours-grid">
                <div className="hours-item">
                  <span className="day">Senin - Jumat</span>
                  <span className="time">09:00 - 18:00</span>
                </div>
                <div className="hours-item">
                  <span className="day">Sabtu</span>
                  <span className="time">10:00 - 17:00</span>
                </div>
                <div className="hours-item">
                  <span className="day">Minggu</span>
                  <span className="time">Tutup</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'faq' && (
          <div className="faq-section">
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <div className="faq-list">
              {faqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                  >
                    <span className="faq-title">{faq.question}</span>
                    <span className={`faq-toggle ${expandedFaqId === faq.id ? 'open' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {expandedFaqId === faq.id && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kontak;
