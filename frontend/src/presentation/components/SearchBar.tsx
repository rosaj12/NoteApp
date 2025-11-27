/**
 * SearchBar Component
 * 
 * Barra de busca e filtros para notas.
 * Permite busca por texto (título/conteúdo) e filtro por categoria.
 * As mudanças são propagadas em tempo real via callbacks.
 * 
 * @component
 * @param {SearchBarProps} props - Propriedades do componente
 * @param {Function} props.onSearch - Callback executado quando o termo de busca muda
 * @param {Function} props.onCategoryFilter - Callback executado quando a categoria muda
 * @param {string[]} props.categories - Array de categorias disponíveis para filtro
 * 
 * @example
 * ```tsx
 * <SearchBar
 *   onSearch={(query) => handleSearch(query)}
 *   onCategoryFilter={(cat) => handleFilter(cat)}
 *   categories={['Trabalho', 'Pessoal', 'Estudos']}
 * />
 * ```
 */
import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onCategoryFilter,
  categories 
}) => {
  // Estado local para controlar o valor do campo de busca
  const [searchQuery, setSearchQuery] = useState('');
  // Estado local para controlar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  /**
   * Manipula mudanças no campo de busca
   * Atualiza o estado local e notifica o componente pai via callback
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança do input
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  /**
   * Manipula mudanças no filtro de categoria
   * Atualiza o estado local e notifica o componente pai via callback
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento de mudança do select
   */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  return (
    <div className="search-bar">
      {/* Campo de busca por texto */}
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar notas..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Filtro de categoria */}
      <div className="filter-wrapper">
        <label htmlFor="category-filter" className="filter-label">
          Categoria:
        </label>
        <select
          id="category-filter"
          className="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {/* Opção padrão para mostrar todas as categorias */}
          <option value="Todas">Todas</option>
          {/* Mapeia categorias disponíveis para options do select */}
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
