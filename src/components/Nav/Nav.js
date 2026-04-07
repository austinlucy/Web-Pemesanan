import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import './Nav.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

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
    navigate('/');
  };

  return (
    <Navbar bg="primary" expand="lg" sticky="top" className="navbar-custom shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand href="/" className="brand-logo fw-bold me-4">
          <span className="logo-badge">S</span>IMADU
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link href="/" className="nav-link-item text-white">
              Beranda
            </Nav.Link>
            <Nav.Link href="/gedung" className="nav-link-item text-white">
              Cari Gedung
            </Nav.Link>
            <Nav.Link href="/sop" className="nav-link-item text-white">
              SOP Pemesanan
            </Nav.Link>
            <Nav.Link href="/kontak" className="nav-link-item text-white">
              Kontak
            </Nav.Link>

            {!currentUser && (
              <>
                <Nav.Link href="/admin" className="nav-link-item admin-link">
                  Admin
                </Nav.Link>
                <Nav.Link href="/login" className="nav-link-item login-link">
                  Login
                </Nav.Link>
              </>
            )}

            {currentUser && currentUser.role === 'admin' && (
              <Nav.Link href="/admin" className="nav-link-item admin-link">
                Admin Panel
              </Nav.Link>
            )}

            {currentUser && (
              <Dropdown className="ms-lg-2 mt-2 mt-lg-0">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-user"
                  className="profile-toggle"
                >
                  👤 {currentUser.nama}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="profile-menu-bootstrap">
                  <Dropdown.Item disabled className="profile-header-menu">
                    <div className="profile-info-menu">
                      <strong>{currentUser.nama}</strong>
                      <div className="small text-muted">{currentUser.email}</div>
                      <span className="badge bg-info mt-1">
                        {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
                      </span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    🚪 Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
