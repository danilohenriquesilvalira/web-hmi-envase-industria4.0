import React from 'react';

// Interface for falhas
export interface Falha {
  codigo: string;
  titulo: string;
  tipo: 'CRITICA' | 'ALERTA' | 'AVISO';
  ativa: boolean;
}

interface AlertSystemProps {
  falhas: Falha[];
  onResetSistema: () => void;
  onReconhecer: () => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ falhas, onResetSistema, onReconhecer }) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  
  // Obter falha principal para exibir
  const falhaAtual = falhas.find(f => f.tipo === 'CRITICA') || 
                     falhas.find(f => f.tipo === 'ALERTA') || 
                     falhas[0];
  const temFalhas = falhas.length > 0;

  return (
    <div className="alert-system-container" style={{ position: 'relative' }}>
      {/* Bell Icon SVG */}
      <div
        onClick={() => temFalhas && setTooltipVisible(!tooltipVisible)}
        style={{
          cursor: temFalhas ? 'pointer' : 'default',
          display: 'inline-flex',
          animation: temFalhas ? 'sinoAlerta 0.8s infinite' : 'none'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke={temFalhas ? "#dc2626" : "#6b7280"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke={temFalhas ? "#dc2626" : "#6b7280"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Tooltip for fault details */}
      {tooltipVisible && temFalhas && falhaAtual && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '-20px',
          marginTop: '10px',
          width: '300px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 1000,
          border: falhaAtual.tipo === 'CRITICA' ? '2px solid #dc2626' : '2px solid #f59e0b'
        }}>
          {/* Cabeçalho do Tooltip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  stroke={falhaAtual.tipo === 'CRITICA' ? "#dc2626" : "#f59e0b"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                  stroke={falhaAtual.tipo === 'CRITICA' ? "#dc2626" : "#f59e0b"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: '0.95rem', 
                fontWeight: 'bold',
                color: falhaAtual.tipo === 'CRITICA' ? '#dc2626' : '#f59e0b'
              }}>
                {falhaAtual.codigo} - {falhaAtual.tipo}
              </h3>
            </div>
          </div>

          {/* Descrição da Falha */}
          <div style={{
            padding: '12px',
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.85rem', 
              color: '#374151',
              lineHeight: '1.4'
            }}>
              {falhaAtual.titulo}
            </p>
            {falhas.length > 1 && (
              <div style={{ 
                marginTop: '8px', 
                fontSize: '0.75rem', 
                color: '#6b7280' 
              }}>
                Total de falhas ativas: {falhas.length}
              </div>
            )}
          </div>

          {/* Botões */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
            padding: '8px 12px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={() => {
                onReconhecer();
                setTooltipVisible(false);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>{' '}
              Reconhecer
            </button>
            <button
              onClick={() => {
                onResetSistema();
                setTooltipVisible(false);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                background: '#ea580c',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
              </svg>{' '}
              Resetar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;