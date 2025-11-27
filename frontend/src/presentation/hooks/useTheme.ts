/**
 * useTheme Hook
 * 
 * Hook customizado para gerenciar tema da aplicação (claro/escuro).
 * Persiste escolha no LocalStorage e aplica automaticamente ao DOM.
 * 
 * Recursos:
 * - Persiste tema entre sessões (LocalStorage)
 * - Aplica tema ao atributo data-theme do documento
 * - Padrão: tema claro
 * - Toggle simples entre claro/escuro
 * - Type-safe com TypeScript
 * 
 * Uso:
 * Define variáveis CSS em [data-theme="light"] e [data-theme="dark"]
 * Hook gerencia a alternância automaticamente
 * 
 * @returns {object} Objeto com tema atual e função toggle
 * @returns {Theme} theme - Tema atual ('light' | 'dark')
 * @returns {Function} toggleTheme - Alterna entre light e dark
 * 
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * 
 * return (
 *   <div>
 *     <p>Tema atual: {theme}</p>
 *     <button onClick={toggleTheme}>
 *       {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
 *     </button>
 *   </div>
 * );
 * ```
 * 
 * @example
 * CSS correspondente:
 * ```css
 * [data-theme="light"] {
 *   --bg-color: #ffffff;
 *   --text-color: #000000;
 * }
 * 
 * [data-theme="dark"] {
 *   --bg-color: #1a1a1a;
 *   --text-color: #ffffff;
 * }
 * ```
 */
import { useState, useEffect } from 'react';

/**
 * Tipo do tema: light (claro) ou dark (escuro)
 */
export type Theme = 'light' | 'dark';

export function useTheme() {
  /**
   * Estado do tema com lazy initialization
   * Tenta ler do LocalStorage, fallback para 'light'
   */
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('noteapp_theme');
    return (saved as Theme) || 'light'; // Cast seguro pois só salvamos 'light' ou 'dark'
  });

  /**
   * Effect que sincroniza tema com LocalStorage e DOM
   * Executa sempre que tema muda
   */
  useEffect(() => {
    // Persiste no LocalStorage para manter entre sessões
    localStorage.setItem('noteapp_theme', theme);
    
    // Aplica ao elemento raiz (html) via atributo data-theme
    // CSS pode então usar seletores [data-theme="light"] e [data-theme="dark"]
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Alterna entre tema claro e escuro
   * Usa função updater para garantir valor correto
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /**
   * Retorna tema atual e função de toggle
   */
  return { theme, toggleTheme };
}
