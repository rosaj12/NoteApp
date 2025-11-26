import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useTheme } from '../hooks/useTheme';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { notes } = useNotes();
  const { theme } = useTheme();

  const recentNotes = notes.slice(0, 6);
  const categories = Array.from(new Set(notes.map(note => note.category)));

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo ao NoteApp
          </h1>
          <p className="hero-subtitle">
            Gerencie suas notas de forma inteligente com Clean Architecture
          </p>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">{notes.length}</div>
              <div className="stat-label">Notas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length}</div>
              <div className="stat-label">Categorias</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{theme === 'dark' ? '🌙' : '☀️'}</div>
              <div className="stat-label">Tema</div>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/notes" className="btn btn-primary-large">
              📝 Ver Todas as Notas
            </Link>
            <Link to="/categories" className="btn btn-secondary-large">
              📂 Categorias
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">✨ Funcionalidades</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>CRUD Completo</h3>
            <p>Crie, edite, visualize e delete suas notas facilmente</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Auto-Save</h3>
            <p>Salvamento automático com LocalStorage API</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Busca Inteligente</h3>
            <p>Encontre notas por título, conteúdo ou categoria</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Temas</h3>
            <p>Alterne entre modo claro e escuro</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsivo</h3>
            <p>Interface adaptável para todos os dispositivos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏗️</div>
            <h3>Clean Architecture</h3>
            <p>Código organizado em camadas bem definidas</p>
          </div>
        </div>
      </section>

      {recentNotes.length > 0 && (
        <section className="recent-section">
          <div className="section-header">
            <h2 className="section-title">📌 Notas Recentes</h2>
            <Link to="/notes" className="view-all-link">
              Ver todas →
            </Link>
          </div>
          <div className="recent-notes-grid">
            {recentNotes.map(note => (
              <Link to="/notes" key={note.id} className="recent-note-card">
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 100)}...</p>
                <span className={`note-category category-${note.category.toLowerCase()}`}>
                  {note.category}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="quick-links-section">
        <h2 className="section-title">🚀 Links Rápidos</h2>
        <div className="quick-links-grid">
          <Link to="/notes" className="quick-link-card">
            <span className="quick-link-icon">📝</span>
            <span className="quick-link-text">Minhas Notas</span>
          </Link>
          <Link to="/categories" className="quick-link-card">
            <span className="quick-link-icon">📂</span>
            <span className="quick-link-text">Categorias</span>
          </Link>
          <Link to="/settings" className="quick-link-card">
            <span className="quick-link-icon">⚙️</span>
            <span className="quick-link-text">Configurações</span>
          </Link>
          <Link to="/about" className="quick-link-card">
            <span className="quick-link-icon">ℹ️</span>
            <span className="quick-link-text">Sobre</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
