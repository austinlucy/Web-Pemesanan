import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validasi form
    if (!email || !password) {
      setError('Email dan password harus diisi');
      setLoading(false);
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid');
      setLoading(false);
      return;
    }

    // Validasi password minimal 6 karakter
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    // Simulasi API call
    setTimeout(() => {
      // Cek di users dari localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      // Cek jika admin (hardcoded)
      const isAdmin = email === 'admin@pemesanan.com' && password === 'admin123';

      if (user) {
        const userData = {
          id: user.id,
          nama: user.nama,
          email: user.email,
          noHp: user.noHp,
          role: user.role,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (rememberMe) {
          localStorage.setItem('rememberEmail', email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/gedung');
        }
      } else if (isAdmin) {
        const adminData = {
          id: 0,
          nama: 'Admin Pemesanan',
          email: 'admin@pemesanan.com',
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(adminData));
        
        if (rememberMe) {
          localStorage.setItem('rememberEmail', email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        navigate('/admin');
      } else {
        setError('Email atau password salah');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Masuk ke Akun Anda</h1>
          <p>Gunakan email dan password untuk mengakses akun</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input 
                type="checkbox" 
                name="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Ingat saya
            </label>
            <a href="/forgot-password" className="forgot-password">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Belum punya akun?{' '}
            <a href="/register" className="signup-link">
              Daftar di sini
            </a>
          </p>
          </div>
        </div>
      </div>
  );
};

export default Login;
