
CREATE DATABASE IF NOT EXISTS pemesanan_gedung;
USE pemesanan_gedung;

-- Table untuk user/member
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(255) NOT NULL,
  noHp VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active' COMMENT 'active atau inactive',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table untuk data gedung
CREATE TABLE IF NOT EXISTS gedung (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  alamat VARCHAR(500) NOT NULL,
  image LONGTEXT NOT NULL,
  price INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table untuk data pesanan/booking
CREATE TABLE IF NOT EXISTS pesanan (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  nama VARCHAR(255) NOT NULL,
  noHp VARCHAR(20) NOT NULL,
  jenisAcara VARCHAR(100) NOT NULL,
  tanggalAcara DATE NOT NULL,
  gedungId INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' COMMENT 'pending atau confirmed',
  tanggalPemesanan DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (gedungId) REFERENCES gedung(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_tanggalAcara (tanggalAcara),
  INDEX idx_gedungId (gedungId),
  INDEX idx_userId (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table untuk jenis acara (referensi)
CREATE TABLE IF NOT EXISTS jenis_acara (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data awal admin
INSERT INTO users (email, password, nama, noHp, role, status) VALUES
('admin@pemesanan.com', 'admin123', 'Admin Pemesanan', '085123456789', 'admin', 'active');

-- Data awal gedung
INSERT INTO gedung (id, name, alamat, image, price) VALUES
(1, 'Gedung Samakai', 'Jl. Samakai No. 123, Kota', '/img/gedung1.jpg', 8000000),
(2, 'Gedung Serbaguna', 'Jl. Serbaguna No. 456, Kota', '/img/gedung2.jpg', 12000000),
(3, 'Gedung PKK', 'Jl. PKK No. 789, Kota', '/img/gedung3.jpg', 5000000),
(4, 'Gedung Dharma Wanita', 'Jl. Dharma Wanita No. 321, Kota', '/img/gedung4.jpg', 6500000);

-- Data awal jenis acara
INSERT INTO jenis_acara (name) VALUES
('Pernikahan'),
('Acara Korporat'),
('Seminar'),
('Workshop'),
('Gathering'),
('Konser'),
('Pesta'),
('Lainnya');

