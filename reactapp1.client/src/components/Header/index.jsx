import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { FiHome, FiMessageCircle, FiCompass, FiMenu, FiX } from "react-icons/fi";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="mobile-header">
        <button className="menu-btn" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} color="#FFF" /> : <FiMenu size={28} color="#FFF" />}
        </button>
        <img src={logo} alt="Logo" className="mobile-logo" />
      </div>

      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <div>
          <img src={logo} alt="Foto do usuário" />
        </div>

        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FiHome size={24} /> Inicio
        </Link>

        <Link to="/consulta" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FiMessageCircle size={24} /> Consulta
        </Link>

        <Link to="/relatorio" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FiCompass size={24} /> Relatórios
        </Link>
      </div>
    </>
  );
}
