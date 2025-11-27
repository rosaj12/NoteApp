/**
 * Toast Component
 * 
 * Componente de notificação toast (temporária) com auto-fechamento.
 * Exibe mensagens de feedback ao usuário com 4 tipos visuais diferentes.
 * 
 * Recursos:
 * - 4 tipos: success, error, warning, info
 * - Auto-fechamento configurável (padrão 3 segundos)
 * - Animações de entrada/saída
 * - Botão manual de fechar
 * - Ícones contextuais por tipo
 * 
 * @component
 * @param {ToastProps} props - Propriedades do componente
 * @param {string} props.message - Mensagem a ser exibida
 * @param {ToastType} [props.type='info'] - Tipo visual do toast
 * @param {number} [props.duration=3000] - Duração em ms antes de fechar
 * @param {Function} [props.onClose] - Callback ao fechar (opcional)
 * 
 * @example
 * ```tsx
 * <Toast
 *   message="Nota salva com sucesso!"
 *   type="success"
 *   duration={3000}
 *   onClose={() => console.log('Toast fechado')}
 * />
 * ```
 */
import React, { useEffect, useState } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  // Controla se o toast está visível no DOM
  const [isVisible, setIsVisible] = useState(true);
  // Controla a animação de saída
  const [isExiting, setIsExiting] = useState(false);

  /**
   * Effect para auto-fechamento do toast
   * Inicia um timer que fecha o toast após a duração especificada
   * Cleanup limpa o timer se o componente desmontar antes
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  /**
   * Fecha o toast com animação
   * Primeiro ativa a animação de saída, depois remove do DOM
   */
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  // Não renderiza se já foi fechado
  if (!isVisible) return null;

  /**
   * Retorna o ícone apropriado baseado no tipo do toast
   * @returns {string} Símbolo Unicode representando o tipo
   */
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-message">{message}</div>
      <button 
        className="toast-close" 
        onClick={handleClose}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  );
};

/**
 * ToastContainer Component
 * 
 * Container para gerenciar múltiplos toasts simultaneamente.
 * Renderiza toasts empilhados verticalmente no canto superior direito.
 * 
 * @component
 * @param {ToastContainerProps} props - Propriedades do componente
 * @param {Array} props.toasts - Array de objetos toast com id, message e type
 * @param {Function} props.onRemove - Callback ao remover um toast (recebe id)
 * 
 * @example
 * ```tsx
 * const [toasts, setToasts] = useState([]);
 * 
 * <ToastContainer
 *   toasts={toasts}
 *   onRemove={(id) => setToasts(toasts.filter(t => t.id !== id))}
 * />
 * ```
 */
export interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};
