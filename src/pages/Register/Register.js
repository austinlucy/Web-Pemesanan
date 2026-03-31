import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
    noHp: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (formData.konfirmasiPassword !== formData.password) {
      newErrors.konfirmasiPassword = 'Konfirmasi password tidak cocok';
    }

    if (!formData.noHp.trim()) {
      newErrors.noHp = 'Nomor HP harus diisi';
    } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.noHp.replace(/\D/g, ''))) {
      newErrors.noHp = 'Format nomor HP tidak valid';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const emailExists = existingUsers.some(u => u.email === formData.email);
      
      if (emailExists) {
        setErrors({ email: 'Email sudah terdaftar' });
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        ...formData,
        role: 'user',
        status: 'active',
        created_at: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      setSuccessMessage('Registrasi berhasil! Redirecting ke login...');
      setFormData({
        nama: '',
        email: '',
        password: '',
        konfirmasiPassword: '',
        noHp: ''
      });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Daftar Akun</h1>
        <p className="register-subtitle">Buat akun baru untuk memulai pemesanan gedung</p>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={handleChange}
              className={errors.nama ? 'input-error' : ''}
            />
            {errors.nama && <span className="error-message">{errors.nama}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="noHp">Nomor HP/WhatsApp</label>
            <input
              id="noHp"
              type="tel"
              name="noHp"
              placeholder="Contoh: 085123456789"
              value={formData.noHp}
              onChange={handleChange}
              className={errors.noHp ? 'input-error' : ''}
            />
            {errors.noHp && <span className="error-message">{errors.noHp}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-btn"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="konfirmasiPassword">Konfirmasi Password</label>
            <div className="password-input">
              <input
                id="konfirmasiPassword"
                type={showKonfirmasi ? 'text' : 'password'}
                name="konfirmasiPassword"
                placeholder="Ketik ulang password"
                value={formData.konfirmasiPassword}
                onChange={handleChange}
                className={errors.konfirmasiPassword ? 'input-error' : ''}
              />
              <button
                type="button"
                onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                className="toggle-btn"
              >
                {showKonfirmasi ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.konfirmasiPassword && <span className="error-message">{errors.konfirmasiPassword}</span>}
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Daftar'}
          </button>
        </form>

        <p className="login-link">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
    </div>
  );
}
