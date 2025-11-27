/**
 * useMediaQuery Hook
 * 
 * Hook customizado para detectar media queries CSS de forma programática.
 * Permite criar lógica responsiva baseada em breakpoints diretamente no JavaScript.
 * 
 * Recursos:
 * - Detecção em tempo real de mudanças em media queries
 * - SSR-safe (verifica se window existe)
 * - Compatibilidade com navegadores antigos e novos
 * - Re-renderiza automaticamente quando media query muda
 * - Performance otimizada com matchMedia API
 * 
 * @param {string} query - Media query CSS válida (ex: '(max-width: 768px)')
 * @returns {boolean} true se media query corresponde, false caso contrário
 * 
 * @example
 * ```tsx
 * // Detectar mobile
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * 
 * // Detectar preferência de tema escuro
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * 
 * // Detectar orientação
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 * 
 * // Usar no render
 * return isMobile ? <MobileView /> : <DesktopView />;
 * ```
 */
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  /**
   * Estado que armazena se a media query está ativa
   * Lazy initialization verifica estado inicial apenas no cliente
   */
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR check: só executa no cliente (browser)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Durante SSR, assume false
  });

  /**
   * Effect que monitora mudanças na media query
   * Registra listener e re-renderiza quando breakpoint muda
   */
  useEffect(() => {
    // Guard para SSR/Node.js onde window não existe
    if (typeof window === 'undefined') {
      return;
    }

    // Cria MediaQueryList object
    const mediaQuery = window.matchMedia(query);
    
    // Atualiza estado com valor atual (pode ter mudado desde inicialização)
    setMatches(mediaQuery.matches);

    /**
     * Handler chamado quando media query muda (ex: resize de janela)
     * @param {MediaQueryListEvent} event - Evento com informação da mudança
     */
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Compatibilidade: navegadores modernos vs antigos
    // Modernos: addEventListener, Antigos: addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Fallback para navegadores antigos (IE, Safari antigo)
      mediaQuery.addListener(handler);
    }

    // Cleanup: remove listener ao desmontar
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]); // Re-executa se query mudar

  return matches;
}

/**
 * =============================================================================
 * HOOKS PRÉ-CONFIGURADOS
 * =============================================================================
 * Hooks de conveniência com breakpoints comuns já definidos.
 * Economizam tempo e garantem consistência em toda aplicação.
 */

/**
 * Detecta se está em dispositivo mobile
 * @returns {boolean} true se largura <= 768px
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * Detecta se está em tablet
 * @returns {boolean} true se largura entre 769px e 1024px
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

/**
 * Detecta se está em desktop
 * @returns {boolean} true se largura >= 1025px
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}

/**
 * Detecta preferência de tema escuro do sistema operacional
 * @returns {boolean} true se usuário prefere dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
