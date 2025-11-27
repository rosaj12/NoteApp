/**
 * useLocalStorage Hook
 * 
 * Hook customizado que sincroniza estado React com LocalStorage do navegador.
 * Funciona como useState mas persiste dados entre sessões e sincroniza entre abas.
 * 
 * Recursos:
 * - Persistência automática no LocalStorage
 * - Sincronização entre múltiplas abas/janelas
 * - Type-safe com TypeScript genérico
 * - Suporte para valores complexos (objetos, arrays)
 * - Tratamento de erros (parse/stringify)
 * - Lazy initialization para performance
 * 
 * @template T - Tipo do valor armazenado
 * @param {string} key - Chave única no LocalStorage
 * @param {T} initialValue - Valor padrão se nada estiver salvo
 * @returns {[T, (value: T | ((val: T) => T)) => void]} Array [valor, setter]
 * 
 * @example
 * ```tsx
 * // Uso básico
 * const [name, setName] = useLocalStorage('username', 'Guest');
 * 
 * // Com objeto
 * const [user, setUser] = useLocalStorage('user', { id: 1, name: 'John' });
 * 
 * // Com função updater
 * setUser(prev => ({ ...prev, name: 'Jane' }));
 * ```
 */
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  /**
   * Estado local que espelha o valor do LocalStorage
   * Usa lazy initialization (função) para evitar parse desnecessário
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Tenta ler valor do LocalStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON se existir, senão usa valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se der erro (JSON inválido, etc), usa valor inicial
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Setter customizado que persiste no LocalStorage
   * Suporta tanto valor direto quanto função updater (como useState)
   * 
   * @param {T | ((val: T) => T)} value - Novo valor ou função updater
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Suporta função updater como useState: setValue(prev => prev + 1)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Atualiza estado React
      setStoredValue(valueToStore);
      
      // Persiste no LocalStorage (serializa para JSON)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispara evento customizado para notificar outras abas
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      // Erros possíveis: stringify falhou, quota excedida, etc
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * Effect para sincronização entre abas/janelas
   * 
   * Escuta dois eventos:
   * 1. 'storage' - Evento nativo do browser quando LocalStorage muda em OUTRA aba
   * 2. 'local-storage' - Evento customizado para sincronizar na MESMA aba
   * 
   * Isso garante que múltiplas instâncias da app permaneçam sincronizadas
   */
  useEffect(() => {
    /**
     * Handler que atualiza estado quando LocalStorage muda
     * Pode ser disparado por outra aba ou pela mesma aba
     */
    const handleStorageChange = () => {
      try {
        // Lê novo valor do LocalStorage
        const item = window.localStorage.getItem(key);
        if (item) {
          // Atualiza estado com novo valor parseado
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error);
      }
    };

    // Registra listeners para ambos eventos
    window.addEventListener('storage', handleStorageChange);           // Mudanças de outras abas
    window.addEventListener('local-storage', handleStorageChange);     // Mudanças da mesma aba

    // Cleanup: remove listeners ao desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}
