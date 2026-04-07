import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Pemesanan from './pages/Pemesanan/Pemesanan';
import PemesananSukses from './pages/PemesananSukses/PemesananSukses';
import Kontak from './pages/Kontak/Kontak';
import SOP from './pages/SOP/SOP';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gedung" element={<Products />} />
          <Route path="/pemesanan" element={<Pemesanan />} />
          <Route path="/pemesanan-sukses" element={<PemesananSukses />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/sop" element={<SOP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
