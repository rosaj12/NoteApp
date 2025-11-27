/**
 * Modal Component
 * 
 * Componente de modal/diálogo reutilizável e acessível.
 * Suporta 3 tamanhos, fecha com ESC, bloqueia scroll da página quando aberto.
 * 
 * Recursos:
 * - 3 tamanhos: small, medium, large
 * - Fecha ao pressionar ESC (via useKeyPress hook)
 * - Fecha ao clicar no overlay (configurável)
 * - Bloqueia scroll do body quando aberto
 * - Header, body e footer customizáveis
 * - Animações de entrada/saída
 * 
 * @component
 * @param {ModalProps} props - Propriedades do componente
 * @param {boolean} props.isOpen - Controla visibilidade do modal
 * @param {Function} props.onClose - Callback para fechar o modal
 * @param {string} [props.title] - Título exibido no header (opcional)
 * @param {ReactNode} props.children - Conteúdo do body do modal
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Tamanho do modal
 * @param {boolean} [props.showCloseButton=true] - Exibir botão X de fechar
 * @param {boolean} [props.closeOnOverlayClick=true] - Fechar ao clicar fora
 * @param {ReactNode} [props.footer] - Conteúdo do footer (opcional)
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Meu Modal"
 *   size="medium"
 * >
 *   <p>Conteúdo do modal</p>
 * </Modal>
 * ```
 */
import React, { useEffect } from 'react';
import { useKeyPress } from '../hooks/useKeyPress';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer
}) => {
  // Detecta quando a tecla ESC é pressionada
  const escapePressed = useKeyPress('Escape');

  /**
   * Effect para fechar modal ao pressionar ESC
   * Só executa quando modal está aberto
   */
  useEffect(() => {
    if (isOpen && escapePressed) {
      onClose();
    }
  }, [escapePressed, isOpen, onClose]);

  /**
   * Effect para controlar scroll do body
   * Bloqueia scroll quando modal está aberto para melhor UX
   * Cleanup restaura o scroll ao desmontar
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Não renderiza nada se modal está fechado
  if (!isOpen) return null;

  /**
   * Manipula clique no overlay (fundo escuro)
   * Fecha o modal apenas se closeOnOverlayClick=true e
   * o clique foi diretamente no overlay (não em elementos internos)
   * 
   * @param {React.MouseEvent<HTMLDivElement>} e - Evento de clique
   */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content modal-${size}`}>
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <button 
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Modal Component
/**
 * ConfirmModal Component
 * 
 * Modal de confirmação pré-estilizado para ações que requerem confirmação do usuário.
 * Extensão do Modal base com layout específico para confirmações.
 * 
 * @component
 * @param {ConfirmModalProps} props - Propriedades do componente
 * @param {boolean} props.isOpen - Controla visibilidade
 * @param {Function} props.onClose - Callback ao cancelar
 * @param {Function} props.onConfirm - Callback ao confirmar
 * @param {string} [props.title='Confirmação'] - Título do modal
 * @param {string} props.message - Mensagem de confirmação
 * @param {string} [props.confirmText='Confirmar'] - Texto do botão confirmar
 * @param {string} [props.cancelText='Cancelar'] - Texto do botão cancelar
 * @param {'info' | 'warning' | 'danger'} [props.type='info'] - Tipo visual do modal
 * 
 * @example
 * ```tsx
 * <ConfirmModal
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleDelete}
 *   title="Deletar nota?"
 *   message="Esta ação não pode ser desfeita."
 *   type="danger"
 * />
 * ```
 */
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmação',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'info'
}) => {
  /**
   * Executa a ação de confirmação e fecha o modal
   */
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  /**
   * Retorna o ícone apropriado baseado no tipo do modal
   * @returns {string} Emoji representando o tipo
   */
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'danger':
        return '🗑️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      closeOnOverlayClick={false}
    >
      <div className="confirm-modal">
        <div className={`confirm-icon confirm-icon-${type}`}>
          {getIcon()}
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
