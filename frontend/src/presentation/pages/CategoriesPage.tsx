/**
 * CategoriesPage Component
 * 
 * Página de visualização e análise de notas agrupadas por categorias.
 * Oferece visão analítica e organizacional do sistema de notas.
 * 
 * Funcionalidades:
 * - Agrupamento automático de notas por categoria
 * - Estatísticas por categoria (quantidade de notas)
 * - Preview das 3 notas mais recentes de cada categoria
 * - Gráfico de distribuição percentual
 * - Cards ordenados por quantidade (categorias mais usadas primeiro)
 * - Estado vazio com CTA para criar primeira nota
 * 
 * Análises exibidas:
 * - Total de categorias ativas
 * - Total de notas no sistema
 * - Média de notas por categoria
 * - Distribuição visual com barra de progresso
 * 
 * @component
 * @example
 * ```tsx
 * <Route path="/categories" element={<CategoriesPage />} />
 * ```
 */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import './CategoriesPage.css';

export const CategoriesPage: React.FC = () => {
  // Obtém todas as notas do sistema
  const { notes } = useNotes();

  /**
   * Memo: Agrupa notas por categoria e prepara dados analíticos
   * 
   * Processamento:
   * 1. Agrupa notas em objeto Record<categoria, notas[]>
   * 2. Transforma em array de objetos com metadados
   * 3. Para cada categoria, seleciona 3 notas mais recentes
   * 4. Ordena categorias por quantidade de notas (descendente)
   * 
   * Recalcula apenas quando array de notas muda
   */
  const categoriesData = useMemo(() => {
    // Etapa 1: Agrupamento
    const grouped: Record<string, typeof notes> = {};
    
    notes.forEach(note => {
      if (!grouped[note.category]) {
        grouped[note.category] = [];
      }
      grouped[note.category].push(note);
    });

    // Etapa 2-4: Transformação, seleção de previews e ordenação
    return Object.entries(grouped)
      .map(([category, categoryNotes]) => ({
        name: category,
        count: categoryNotes.length,
        // Ordena por data e pega as 3 mais recentes para preview
        notes: categoryNotes.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ).slice(0, 3),
      }))
      // Ordena categorias pela quantidade (mais usadas primeiro)
      .sort((a, b) => b.count - a.count);
  }, [notes]);

  /**
   * Mapeamento de ícones por categoria
   * Usado para identificação visual rápida
   */
  const categoryIcons: Record<string, string> = {
    'Geral': '📌',
    'Trabalho': '💼',
    'Pessoal': '👤',
    'Estudos': '📚',
    'Ideias': '💡',
  };

  /**
   * Mapeamento de cores por categoria
   * Usado em badges e visualizações
   */
  const categoryColors: Record<string, string> = {
    'Geral': '#2196f3',
    'Trabalho': '#ff9800',
    'Pessoal': '#9c27b0',
    'Estudos': '#4caf50',
    'Ideias': '#ffc107',
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1 className="page-title">📂 Categorias</h1>
        <p className="page-subtitle">
          Organize suas notas por categorias
        </p>
      </div>

      {categoriesData.length === 0 ? (
        <div className="empty-categories">
          <div className="empty-icon">📂</div>
          <h2>Nenhuma categoria ainda</h2>
          <p>Crie sua primeira nota para começar a organizar por categorias</p>
          <Link to="/notes" className="btn btn-primary">
            ➕ Criar Nota
          </Link>
        </div>
      ) : (
        <>
          <div className="categories-overview">
            <div className="overview-card">
              <div className="overview-number">{categoriesData.length}</div>
              <div className="overview-label">Categorias Ativas</div>
            </div>
            <div className="overview-card">
              <div className="overview-number">{notes.length}</div>
              <div className="overview-label">Total de Notas</div>
            </div>
            <div className="overview-card">
              <div className="overview-number">
                {Math.round(notes.length / categoriesData.length)}
              </div>
              <div className="overview-label">Média por Categoria</div>
            </div>
          </div>

          <div className="categories-grid">
            {categoriesData.map(({ name, count, notes: categoryNotes }) => (
              <div 
                key={name} 
                className="category-card"
                style={{
                  borderColor: categoryColors[name] || '#757575',
                }}
              >
                <div className="category-header">
                  <div className="category-info">
                    <span className="category-icon">
                      {categoryIcons[name] || '📁'}
                    </span>
                    <h2 className="category-name">{name}</h2>
                  </div>
                  <div 
                    className="category-count"
                    style={{
                      backgroundColor: categoryColors[name] || '#757575',
                    }}
                  >
                    {count}
                  </div>
                </div>

                <div className="category-notes">
                  <h3 className="category-notes-title">Notas Recentes:</h3>
                  {categoryNotes.length > 0 ? (
                    <ul className="category-notes-list">
                      {categoryNotes.map(note => (
                        <li key={note.id} className="category-note-item">
                          <span className="note-bullet">•</span>
                          <div className="note-info">
                            <div className="note-title-small">{note.title}</div>
                            <div className="note-preview">
                              {note.content.substring(0, 60)}...
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-notes-message">Nenhuma nota nesta categoria</p>
                  )}
                </div>

                <Link 
                  to="/notes" 
                  className="view-category-btn"
                  style={{
                    color: categoryColors[name] || '#757575',
                  }}
                >
                  Ver todas as {count} notas →
                </Link>
              </div>
            ))}
          </div>

          <div className="categories-chart">
            <h2 className="chart-title">Distribuição de Notas</h2>
            <div className="chart-bars">
              {categoriesData.map(({ name, count }) => {
                const percentage = (count / notes.length) * 100;
                return (
                  <div key={name} className="chart-bar-container">
                    <div className="chart-label">
                      <span className="chart-category-name">
                        {categoryIcons[name] || '📁'} {name}
                      </span>
                      <span className="chart-count">{count}</span>
                    </div>
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: categoryColors[name] || '#757575',
                        }}
                      />
                    </div>
                    <div className="chart-percentage">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
