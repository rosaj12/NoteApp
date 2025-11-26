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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  return (
    <div className="search-bar">
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
          <option value="Todas">Todas</option>
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
