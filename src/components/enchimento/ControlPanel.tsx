import React from 'react';

interface ControlPanelProps {
  processoAtivo: boolean;
  onIniciarParar: () => void;
  onResetSistema: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  processoAtivo,
  onIniciarParar,
  onResetSistema,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {/* Play/Stop Button */}
      <button
        onClick={onIniciarParar}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: '600',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          background: processoAtivo ? '#dc2626' : '#16a34a',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        {processoAtivo ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            PARAR
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            INICIAR
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        onClick={onResetSistema}
        disabled={processoAtivo}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: '600',
          color: 'white',
          border: 'none',
          cursor: processoAtivo ? 'not-allowed' : 'pointer',
          background: processoAtivo ? '#9ca3af' : '#ea580c',
          fontSize: '0.875rem',
          opacity: processoAtivo ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
        </svg>
        RESET
      </button>
    </div>
  );
};

export default ControlPanel;