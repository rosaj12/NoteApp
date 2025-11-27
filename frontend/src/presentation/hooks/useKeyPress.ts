/**
 * useKeyPress Hook
 * 
 * Hook customizado para detectar quando teclas específicas são pressionadas.
 * Suporta teclas modificadoras (Ctrl, Alt, Shift, Meta/Command) e executa
 * callbacks personalizados. Retorna boolean indicando se a tecla está pressionada.
 * 
 * Recursos:
 * - Detecção de qualquer tecla do teclado
 * - Suporte para modificadores (Ctrl, Alt, Shift, Meta)
 * - Callback opcional para executar ações
 * - Retorna estado atual (pressionado/solto)
 * - Auto cleanup de event listeners
 * 
 * @param {string} targetKey - Nome da tecla (ex: 'Enter', 'Escape', 'a', 'ArrowUp')
 * @param {Function} handler - Callback executado quando tecla é pressionada (opcional)
 * @param {KeyPressOptions} options - Modificadores necessários (ctrl, alt, shift, meta)
 * @returns {boolean} true se tecla está pressionada, false caso contrário
 * 
 * @example
 * ```tsx
 * // Detectar Enter simples
 * const enterPressed = useKeyPress('Enter');
 * 
 * // Detectar Ctrl+S com handler
 * useKeyPress('s', (e) => {
 *   e.preventDefault();
 *   saveDocument();
 * }, { ctrl: true });
 * 
 * // Detectar Escape
 * const escPressed = useKeyPress('Escape');
 * useEffect(() => {
 *   if (escPressed) closeModal();
 * }, [escPressed]);
 * ```
 */
import { useState, useEffect, useCallback } from 'react';

/**
 * Opções para modificadores de teclado
 */
interface KeyPressOptions {
  ctrl?: boolean;   // Tecla Ctrl
  alt?: boolean;    // Tecla Alt
  shift?: boolean;  // Tecla Shift
  meta?: boolean;   // Tecla Command (Mac) / Windows key
}

export function useKeyPress(
  targetKey: string,
  handler?: (event: KeyboardEvent) => void,
  options: KeyPressOptions = {}
): boolean {
  // Estado que rastreia se a tecla alvo está pressionada
  const [keyPressed, setKeyPressed] = useState(false);

  /**
   * Handler de keydown - executado quando tecla é pressionada
   * Verifica se é a tecla alvo e se modificadores correspondem
   */
  const downHandler = useCallback(
    (event: KeyboardEvent) => {
      // Verifica se a tecla pressionada corresponde à alvo
      if (event.key === targetKey) {
        // Valida modificadores: se opção não especificada, aceita qualquer estado
        // Se especificada como true, exige que modificador esteja pressionado
        const ctrlMatch = options.ctrl ? event.ctrlKey : true;
        const altMatch = options.alt ? event.altKey : true;
        const shiftMatch = options.shift ? event.shiftKey : true;
        const metaMatch = options.meta ? event.metaKey : true;

        // Só executa se todos os modificadores corresponderem
        if (ctrlMatch && altMatch && shiftMatch && metaMatch) {
          setKeyPressed(true);
          
          // Executa callback customizado se fornecido
          if (handler) {
            handler(event);
          }
        }
      }
    },
    [targetKey, handler, options]
  );

  /**
   * Handler de keyup - executado quando tecla é solta
   * Reseta o estado para false
   */
  const upHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  /**
   * Effect que registra/remove event listeners globais
   * Cleanup garante que listeners sejam removidos ao desmontar
   */
  useEffect(() => {
    // Adiciona listeners para keydown e keyup
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Cleanup: remove listeners ao desmontar componente
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}

/**
 * useHotkeys Hook
 * 
 * Hook para registrar múltiplas combinações de teclas (hotkeys/atalhos)
 * de forma declarativa. Ideal para implementar atalhos de teclado em aplicações.
 * 
 * Formato da combinação: 'modificador+modificador+tecla'
 * Modificadores: ctrl, alt, shift, meta
 * 
 * @param {Record<string, Function>} hotkeys - Objeto mapeando combinações para handlers
 * 
 * @example
 * ```tsx
 * useHotkeys({
 *   'ctrl+s': (e) => { e.preventDefault(); saveDocument(); },
 *   'ctrl+shift+p': () => openCommandPalette(),
 *   'escape': () => closeModal(),
 *   'ctrl+k': () => focusSearch(),
 * });
 * ```
 */
export function useHotkeys(
  hotkeys: Record<string, (event: KeyboardEvent) => void>
) {
  useEffect(() => {
    /**
     * Handler global que captura todas as teclas pressionadas
     * e verifica se correspondem a algum hotkey registrado
     */
    const handler = (event: KeyboardEvent) => {
      // Constrói string representando a combinação pressionada
      const keys = [];
      if (event.ctrlKey) keys.push('ctrl');
      if (event.altKey) keys.push('alt');
      if (event.shiftKey) keys.push('shift');
      if (event.metaKey) keys.push('meta');
      keys.push(event.key.toLowerCase());

      // Cria chave no formato 'ctrl+shift+s'
      const combination = keys.join('+');

      // Se existe handler para essa combinação, executa
      if (hotkeys[combination]) {
        event.preventDefault(); // Previne comportamento padrão do browser
        hotkeys[combination](event);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hotkeys]);
}

/**
 * useArrowKeys Hook
 * 
 * Hook especializado para detectar setas de navegação do teclado.
 * Útil para navegação por teclado em listas, menus, grids, etc.
 * 
 * @returns {'up' | 'down' | 'left' | 'right' | null} Direção da última seta pressionada
 * 
 * @example
 * ```tsx
 * const direction = useArrowKeys();
 * 
 * useEffect(() => {
 *   switch(direction) {
 *     case 'up': navigateToPrevious(); break;
 *     case 'down': navigateToNext(); break;
 *     case 'left': navigateToParent(); break;
 *     case 'right': navigateToChild(); break;
 *   }
 * }, [direction]);
 * ```
 */
export function useArrowKeys() {
  // Estado que rastreia qual seta foi pressionada por último
  const [direction, setDirection] = useState<
    'up' | 'down' | 'left' | 'right' | null
  >(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        default:
          return;
      }
    };

    const resetHandler = () => setDirection(null);

    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', resetHandler);

    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('keyup', resetHandler);
    };
  }, []);

  return direction;
}
