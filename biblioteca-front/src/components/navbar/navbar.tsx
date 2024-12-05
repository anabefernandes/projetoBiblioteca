import React, { useState } from 'react';
import './navbar.css';
import logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenModal: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchBy: 'titulo' | 'autor';
  setSearchBy: (value: 'titulo' | 'autor') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, searchTerm, setSearchTerm, searchBy, setSearchBy }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="Logo da Biblioteca" />
      
      <div className='nav-center'>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Buscar por ${searchBy === 'titulo' ? 'título' : 'autor'}`}
        />
        <select onChange={(e) => setSearchBy(e.target.value as 'titulo' | 'autor')} value={searchBy}>
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
        </select>
      </div>

      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          Disponibilidade
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => navigate('/disponiveis')}>Livros Disponíveis</button>
            <button onClick={() => navigate('/indisponiveis')}>Livros Indisponíveis</button>
          </div>
        )}
      </div>
      </div>
      
      <div className="nav-actions">
      <button className="novo-livro" onClick={onOpenModal}>
        Novo Livro
      </button>

      {token ? (
        <>
          <button className="logout-button" onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <button className="logout-button" onClick={() => navigate('/login')}>Login</button>
      )}
      </div>
    </nav>
  );
};

export default Navbar;