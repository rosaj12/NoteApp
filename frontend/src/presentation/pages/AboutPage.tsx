/**
 * AboutPage Component
 * 
 * Página informativa sobre o projeto NoteApp.
 * Documentação visual e interativa apresentando arquitetura, tecnologias e funcionalidades.
 * 
 * Conteúdo:
 * - Hero: Badge de versão, título e descrição do projeto
 * - Funcionalidades: Grid com 6 features principais (CRUD, LocalStorage, etc)
 * - Arquitetura: Explicação visual das 4 camadas da Clean Architecture
 * - Tech Stack: Tecnologias frontend e backend com descrições
 * - Documentação: Lista de 11 arquivos .md disponíveis
 * - SOLID: Cards explicando cada princípio SOLID
 * - Créditos: Links e informações sobre desenvolvimento
 * 
 * Design:
 * - Layout informativo e educacional
 * - Cards interativos com hover effects
 * - Seções bem separadas visualmente
 * - Gradientes e cores do tema
 * - Responsivo para todos os dispositivos
 * 
 * @component
 * @example
 * ```tsx
 * <Route path="/about" element={<AboutPage />} />
 * ```
 */
import React from 'react';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  /**
   * Array de funcionalidades principais da aplicação
   * Usado para renderizar grid de features
   */
  const features = [
    {
      icon: '📝',
      title: 'CRUD Completo',
      description: 'Crie, leia, atualize e delete notas com facilidade'
    },
    {
      icon: '💾',
      title: 'LocalStorage',
      description: 'Salvamento automático com persistência local'
    },
    {
      icon: '🔍',
      title: 'Busca e Filtros',
      description: 'Encontre suas notas rapidamente com busca inteligente'
    },
    {
      icon: '🎨',
      title: 'Temas',
      description: 'Alterne entre modo claro e escuro'
    },
    {
      icon: '📊',
      title: 'Categorias',
      description: 'Organize suas notas por categorias'
    },
    {
      icon: '⚡',
      title: 'Performático',
      description: 'Interface rápida e responsiva'
    }
  ];

  /**
   * Stack tecnológica organizada por camada (Frontend/Backend)
   * Cada tecnologia inclui nome e descrição breve
   */
  const techStack = [
    {
      category: 'Frontend',
      icon: '⚛️',
      technologies: [
        { name: 'React 18.2', description: 'Biblioteca UI moderna' },
        { name: 'TypeScript 5.1', description: 'Type safety e autocomplete' },
        { name: 'Vite 4.4', description: 'Build tool ultra-rápido' },
        { name: 'React Router 6.16', description: 'Navegação SPA' },
        { name: 'CSS3', description: 'Estilização moderna com variáveis' }
      ]
    },
    {
      category: 'Backend',
      icon: '🚀',
      technologies: [
        { name: 'Node.js', description: 'Runtime JavaScript' },
        { name: 'Express 4.18', description: 'Framework web minimalista' },
        { name: 'TypeScript', description: 'Type safety no backend' },
        { name: 'CORS', description: 'Cross-origin resource sharing' },
        { name: 'UUID', description: 'Geração de IDs únicos' }
      ]
    }
  ];

  /**
   * Camadas da Clean Architecture com exemplos práticos
   * Ilustra separação de responsabilidades do projeto
   */
  const architecture = [
    {
      layer: 'Domain',
      icon: '🏛️',
      description: 'Entidades e contratos (interfaces)',
      examples: 'Note.ts, INoteRepository.ts'
    },
    {
      layer: 'Use Cases',
      icon: '⚙️',
      description: 'Lógica de negócio e regras',
      examples: 'CreateNote, UpdateNote, DeleteNote'
    },
    {
      layer: 'Adapters',
      icon: '🔌',
      description: 'Controladores e repositórios',
      examples: 'NoteController, LocalStorageNoteRepository'
    },
    {
      layer: 'Infrastructure',
      icon: '🏗️',
      description: 'Frameworks, rotas e UI',
      examples: 'Express routes, React components'
    }
  ];

  const documentation = [
    { name: 'README.md', description: 'Visão geral do projeto', icon: '📖' },
    { name: 'INSTALL.md', description: 'Guia de instalação', icon: '⚙️' },
    { name: 'ARCHITECTURE.md', description: 'Arquitetura detalhada', icon: '🏛️' },
    { name: 'SOLID.md', description: 'Princípios SOLID aplicados', icon: '💎' },
    { name: 'TESTING.md', description: 'Estratégia de testes', icon: '🧪' },
    { name: 'API.md', description: 'Documentação da API', icon: '🌐' },
    { name: 'DIAGRAMS.md', description: 'Diagramas do sistema', icon: '📊' },
    { name: 'UI_MOCKUPS.md', description: 'Mockups da interface', icon: '🎨' },
    { name: 'TROUBLESHOOTING.md', description: 'Solução de problemas', icon: '🔧' },
    { name: 'PROJECT_SUMMARY.md', description: 'Resumo do projeto', icon: '📋' },
    { name: 'QUICKSTART.md', description: 'Início rápido', icon: '🚀' }
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="hero-badge">v1.0.0</div>
        <h1 className="page-title">📔 NoteApp</h1>
        <p className="page-subtitle">
          Sistema de Gerenciamento de Notas com Clean Architecture
        </p>
        <p className="hero-description">
          Uma aplicação web moderna construída com as melhores práticas de desenvolvimento,
          seguindo os princípios SOLID e padrões de Clean Architecture.
        </p>
      </div>

      {/* Features */}
      <section className="about-section">
        <h2 className="section-title">✨ Funcionalidades</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="about-section">
        <h2 className="section-title">🏛️ Clean Architecture</h2>
        <p className="section-description">
          O projeto segue os princípios de Clean Architecture, garantindo separação de responsabilidades,
          testabilidade e manutenibilidade do código.
        </p>
        <div className="architecture-layers">
          {architecture.map((layer, index) => (
            <div key={index} className="layer-card">
              <div className="layer-header">
                <span className="layer-icon">{layer.icon}</span>
                <h3 className="layer-title">{layer.layer}</h3>
              </div>
              <p className="layer-description">{layer.description}</p>
              <div className="layer-examples">
                <code>{layer.examples}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2 className="section-title">💻 Stack Tecnológica</h2>
        <div className="tech-stack">
          {techStack.map((stack, index) => (
            <div key={index} className="tech-category">
              <div className="tech-category-header">
                <span className="tech-icon">{stack.icon}</span>
                <h3 className="tech-category-title">{stack.category}</h3>
              </div>
              <div className="tech-list">
                {stack.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="tech-item">
                    <div className="tech-name">{tech.name}</div>
                    <div className="tech-description">{tech.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Documentation */}
      <section className="about-section">
        <h2 className="section-title">📚 Documentação</h2>
        <p className="section-description">
          Documentação completa disponível na pasta raiz do projeto
        </p>
        <div className="docs-grid">
          {documentation.map((doc, index) => (
            <div key={index} className="doc-card">
              <span className="doc-icon">{doc.icon}</span>
              <div className="doc-info">
                <div className="doc-name">{doc.name}</div>
                <div className="doc-description">{doc.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLID Principles */}
      <section className="about-section">
        <h2 className="section-title">💎 Princípios SOLID</h2>
        <div className="solid-principles">
          <div className="solid-item">
            <div className="solid-letter">S</div>
            <div className="solid-content">
              <h4>Single Responsibility</h4>
              <p>Cada classe tem uma única responsabilidade</p>
            </div>
          </div>
          <div className="solid-item">
            <div className="solid-letter">O</div>
            <div className="solid-content">
              <h4>Open/Closed</h4>
              <p>Aberto para extensão, fechado para modificação</p>
            </div>
          </div>
          <div className="solid-item">
            <div className="solid-letter">L</div>
            <div className="solid-content">
              <h4>Liskov Substitution</h4>
              <p>Subtipos devem ser substituíveis por seus tipos base</p>
            </div>
          </div>
          <div className="solid-item">
            <div className="solid-letter">I</div>
            <div className="solid-content">
              <h4>Interface Segregation</h4>
              <p>Interfaces específicas são melhores que uma interface geral</p>
            </div>
          </div>
          <div className="solid-item">
            <div className="solid-letter">D</div>
            <div className="solid-content">
              <h4>Dependency Inversion</h4>
              <p>Dependa de abstrações, não de implementações</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="about-section">
        <h2 className="section-title">👨‍💻 Créditos</h2>
        <div className="credits-card">
          <p className="credits-text">
            Desenvolvido como exemplo de aplicação moderna seguindo Clean Architecture,
            princípios SOLID e as melhores práticas de desenvolvimento web.
          </p>
          <div className="credits-links">
            <a href="https://github.com" className="credit-link" target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
            <a href="#" className="credit-link">
              📧 Contato
            </a>
            <a href="#" className="credit-link">
              📖 Documentação Completa
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2024 NoteApp - Clean Architecture Example</p>
        <p className="footer-subtitle">Built with ❤️ using React + TypeScript</p>
      </footer>
    </div>
  );
};
