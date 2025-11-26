import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook para detectar pressionamento de teclas
 * @param targetKey - Tecla alvo (ex: 'Enter', 'Escape', 'a')
 * @param handler - Função callback a ser executada
 * @param options - Opções adicionais (ctrl, alt, shift)
 */
interface KeyPressOptions {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean; // Command no Mac
}

export function useKeyPress(
  targetKey: string,
  handler?: (event: KeyboardEvent) => void,
  options: KeyPressOptions = {}
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    (event: KeyboardEvent) => {
      // Verifica se a tecla pressionada é a alvo
      if (event.key === targetKey) {
        // Verifica modificadores se especificados
        const ctrlMatch = options.ctrl ? event.ctrlKey : true;
        const altMatch = options.alt ? event.altKey : true;
        const shiftMatch = options.shift ? event.shiftKey : true;
        const metaMatch = options.meta ? event.metaKey : true;

        if (ctrlMatch && altMatch && shiftMatch && metaMatch) {
          setKeyPressed(true);
          
          if (handler) {
            handler(event);
          }
        }
      }
    },
    [targetKey, handler, options]
  );

  const upHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}

/**
 * Hook para detectar combinações de teclas comuns
 */
export function useHotkeys(
  hotkeys: Record<string, (event: KeyboardEvent) => void>
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // Cria uma chave para a combinação
      const keys = [];
      if (event.ctrlKey) keys.push('ctrl');
      if (event.altKey) keys.push('alt');
      if (event.shiftKey) keys.push('shift');
      if (event.metaKey) keys.push('meta');
      keys.push(event.key.toLowerCase());

      const combination = keys.join('+');

      // Verifica se existe um handler para essa combinação
      if (hotkeys[combination]) {
        event.preventDefault();
        hotkeys[combination](event);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hotkeys]);
}

/**
 * Hook para detectar teclas de navegação
 */
export function useArrowKeys() {
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
