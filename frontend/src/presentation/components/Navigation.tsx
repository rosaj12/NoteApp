/**
 * Navigation Component
 * 
 * Componente de navegação principal da aplicação com suporte a routing.
 * Inclui menu responsivo para mobile, links de navegação e toggle de tema.
 * Utiliza NavLink do React Router para navegação SPA com indicação visual da rota ativa.
 * 
 * @component
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './Navigation.css';

export const Navigation: React.FC = () => {
  // Hook para gerenciar tema claro/escuro
  const { theme, toggleTheme } = useTheme();
  // Estado para controlar abertura/fechamento do menu mobile
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  /**
   * Alterna o estado de abertura do menu mobile
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Fecha o menu mobile (usado ao clicar em um link)
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">📔</span>
          <span className="brand-text">NoteApp</span>
        </div>

        <button 
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">🏠</span>
            <span>Início</span>
          </NavLink>

          <NavLink 
            to="/notes" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">📝</span>
            <span>Notas</span>
          </NavLink>

          <NavLink 
            to="/categories" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">📂</span>
            <span>Categorias</span>
          </NavLink>

          <NavLink 
            to="/settings" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">⚙️</span>
            <span>Configurações</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">ℹ️</span>
            <span>Sobre</span>
          </NavLink>
        </div>

        <button 
          className="theme-toggle-nav"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};
