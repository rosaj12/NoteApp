import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">📝 NoteApp</h1>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Alternar tema"
          title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};
