import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check localStorage for current user
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    // Listen for storage changes (e.g., from other tabs)
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowProfileMenu(false);
    navigate('/');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const profileMenu = document.querySelector('.profile-menu');
      if (profileMenu && !profileMenu.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">SIMADU</a>
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
            <a href="/sop" className="nav-link">
              SOP Pemesanan
            </a>
          </li>
          <li className="nav-item">
            <a href="/kontak" className="nav-link">
              Kontak
            </a>
          </li>

          {!currentUser && (
            <>
              <li className="nav-item">
                <a href="/admin" className="nav-link nav-link-admin">
                  Admin
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link nav-link-btn">
                  Login
                </a>
              </li>
            </>
          )}

          {currentUser && currentUser.role === 'admin' && (
            <li className="nav-item">
              <a href="/admin" className="nav-link nav-link-admin">
                Admin Panel
              </a>
            </li>
          )}

          {currentUser && (
            <li className="nav-item nav-profile-item">
              <div className="profile-menu">
                <button 
                  className="profile-btn"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <span className="profile-icon">👤</span>
                  <span className="profile-name">{currentUser.nama}</span>
                  <span className="profile-toggle">▼</span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <div className="profile-avatar">👤</div>
                      <div className="profile-info">
                        <p className="profile-user-name">{currentUser.nama}</p>
                        <p className="profile-user-email">{currentUser.email}</p>
                        <p className="profile-user-role">
                          {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
                        </p>
                      </div>
                    </div>
                    <div className="profile-divider"></div>
                    <button 
                      className="profile-logout-btn"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
