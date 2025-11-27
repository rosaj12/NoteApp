/**
 * Header Component
 * 
 * Componente de cabeçalho principal da aplicação que exibe o título e botão de alternância de tema.
 * Utiliza o hook useTheme para gerenciar o estado do tema (claro/escuro).
 * 
 * @component
 * @example
 * ```tsx
 * <Header />
 * ```
 */
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

export const Header: React.FC = () => {
  // Obtém o tema atual e a função para alternar entre claro/escuro
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        {/* Título principal da aplicação */}
        <h1 className="header-title">📝 NoteApp</h1>
        
        {/* Botão de alternância de tema com ícone dinâmico baseado no tema atual */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Alternar tema"
          title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
          {/* Exibe lua (🌙) no tema claro ou sol (☀️) no tema escuro */}
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};
