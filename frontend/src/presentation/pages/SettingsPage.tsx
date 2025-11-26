import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [autoSave, setAutoSave] = useLocalStorage('noteapp_autosave', true);
  const [notifications, setNotifications] = useLocalStorage('noteapp_notifications', true);
  const [defaultCategory, setDefaultCategory] = useLocalStorage('noteapp_default_category', 'Geral');

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita!')) {
      if (window.confirm('Última confirmação: Isso irá deletar todas as suas notas!')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const handleExportData = () => {
    const notes = localStorage.getItem('noteapp_notes');
    if (!notes) {
      alert('Nenhuma nota para exportar');
      return;
    }

    const dataStr = JSON.stringify(JSON.parse(notes), null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `noteapp-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStorageUsage = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2); // KB
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="page-title">⚙️ Configurações</h1>
        <p className="page-subtitle">
          Personalize sua experiência no NoteApp
        </p>
      </div>

      <div className="settings-content">
        {/* Appearance Section */}
        <section className="settings-section">
          <h2 className="section-title">
            <span className="section-icon">🎨</span>
            Aparência
          </h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Tema</div>
              <div className="setting-description">
                Escolha entre modo claro e escuro
              </div>
            </div>
            <div className="setting-control">
              <button 
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                ☀️ Claro
              </button>
              <button 
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme === 'light' && toggleTheme()}
              >
                🌙 Escuro
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="settings-section">
          <h2 className="section-title">
            <span className="section-icon">🔧</span>
            Preferências
          </h2>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Salvamento Automático</div>
              <div className="setting-description">
                Salvar automaticamente as alterações
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Notificações</div>
              <div className="setting-description">
                Mostrar notificações de ações
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Categoria Padrão</div>
              <div className="setting-description">
                Categoria padrão para novas notas
              </div>
            </div>
            <select
              className="setting-select"
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
            >
              <option value="Geral">Geral</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Estudos">Estudos</option>
              <option value="Ideias">Ideias</option>
            </select>
          </div>
        </section>

        {/* Data Section */}
        <section className="settings-section">
          <h2 className="section-title">
            <span className="section-icon">💾</span>
            Dados e Armazenamento
          </h2>

          <div className="storage-info">
            <div className="storage-item">
              <span className="storage-label">Espaço Utilizado:</span>
              <span className="storage-value">{getStorageUsage()} KB</span>
            </div>
            <div className="storage-item">
              <span className="storage-label">Limite LocalStorage:</span>
              <span className="storage-value">~5-10 MB</span>
            </div>
          </div>

          <div className="data-actions">
            <button 
              className="btn btn-secondary"
              onClick={handleExportData}
            >
              📥 Exportar Dados (JSON)
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleClearData}
            >
              🗑️ Limpar Todos os Dados
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section className="settings-section">
          <h2 className="section-title">
            <span className="section-icon">ℹ️</span>
            Informações
          </h2>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-label">Versão</div>
              <div className="info-value">1.0.0</div>
            </div>
            <div className="info-card">
              <div className="info-label">Arquitetura</div>
              <div className="info-value">Clean Architecture</div>
            </div>
            <div className="info-card">
              <div className="info-label">Frontend</div>
              <div className="info-value">React + TypeScript</div>
            </div>
            <div className="info-card">
              <div className="info-label">Backend</div>
              <div className="info-value">Node.js + Express</div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="settings-section">
          <h2 className="section-title">
            <span className="section-icon">⌨️</span>
            Atalhos de Teclado
          </h2>

          <div className="shortcuts-list">
            <div className="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>N</kbd>
              <span>Nova Nota</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>S</kbd>
              <span>Salvar Nota</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>F</kbd>
              <span>Buscar</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>K</kbd>
              <span>Alternar Tema</span>
            </div>
            <div className="shortcut-item">
              <kbd>Esc</kbd>
              <span>Cancelar Edição</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
