import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import CariGedung from './pages/CariGedung';
import Paket from './pages/Paket';
import TentangKami from './pages/TentangKami';
import Kontak from './pages/Kontak';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gedung" element={<CariGedung />} />
          <Route path="/paket" element={<Paket />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
