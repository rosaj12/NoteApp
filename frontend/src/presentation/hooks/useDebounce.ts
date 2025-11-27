/**
 * useDebounce Hook
 * 
 * Hook customizado que atrasa a atualização de um valor até que um tempo específico
 * tenha passado sem mudanças. Extremamente útil para otimizar operações custosas
 * como buscas em tempo real, validações de formulário e chamadas de API.
 * 
 * Benefícios:
 * - Reduz número de renderizações desnecessárias
 * - Otimiza performance em campos de busca
 * - Evita chamadas excessivas a APIs
 * - Melhora experiência do usuário em inputs
 * 
 * @template T - Tipo do valor a ser debounced
 * @param {T} value - Valor atual que será debounced
 * @param {number} delay - Tempo de espera em milissegundos (padrão: 500ms)
 * @returns {T} Valor debounced (atrasado)
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // Esta busca só executa 300ms após o usuário parar de digitar
 *   searchAPI(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  // Estado que armazena o valor debounced
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  /**
   * Effect que gerencia o timeout de debounce
   * - Cria um novo timeout sempre que 'value' ou 'delay' mudam
   * - Limpa o timeout anterior antes de criar um novo (cleanup)
   * - Só atualiza debouncedValue após o delay completo sem mudanças
   */
  useEffect(() => {
    // Configura timeout para atualizar o valor após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancela timeout se valor mudar antes do delay completar
    // Isso garante que só o último valor seja usado
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedValue Hook (Variante Avançada)
 * 
 * Versão estendida do useDebounce que também retorna um indicador de estado
 * de debouncing. Útil quando você precisa mostrar feedback visual ao usuário
 * enquanto o debounce está em andamento.
 * 
 * @template T - Tipo do valor a ser debounced
 * @param {T} value - Valor atual que será debounced
 * @param {number} delay - Tempo de espera em milissegundos (padrão: 500ms)
 * @returns {{debouncedValue: T, isDebouncing: boolean}} Objeto com valor e estado
 * 
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const { debouncedValue, isDebouncing } = useDebouncedValue(search, 500);
 * 
 * return (
 *   <div>
 *     <input value={search} onChange={e => setSearch(e.target.value)} />
 *     {isDebouncing && <Spinner />}
 *     <Results query={debouncedValue} />
 *   </div>
 * );
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number = 500) {
  // Estado do valor debounced
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // Estado que indica se está aguardando o debounce
  const [isDebouncing, setIsDebouncing] = useState(false);

  /**
   * Effect que gerencia debounce com indicador de estado
   * - Marca isDebouncing como true imediatamente quando value muda
   * - Após o delay, atualiza o valor e marca isDebouncing como false
   * - Cleanup cancela timeout pendente
   */
  useEffect(() => {
    // Marca que começou o processo de debounce
    setIsDebouncing(true);
    
    // Agenda atualização do valor e fim do estado de debounce
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    // Cleanup: cancela timeout se valor mudar novamente
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
}
