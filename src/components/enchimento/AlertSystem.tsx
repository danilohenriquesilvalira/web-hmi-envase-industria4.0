import React from 'react';

export interface Falha {
  codigo: string;
  titulo: string;
  tipo: 'ALERTA' | 'CRITICA';
  ativa: boolean;
}

interface AlertSystemProps {
  falhas: Falha[];
  onReconhecer: () => void;
  onResetSistema: () => void;
  sinoVisivel?: boolean;
}

// Componente simplificado - APENAS O SINO
const AlertSystem: React.FC<AlertSystemProps> = ({ 
  falhas, 
  onReconhecer,
  onResetSistema,
  sinoVisivel = true
}) => {
  const temFalhas = falhas.length > 0;
  const falhaCritica = falhas.some(falha => falha.tipo === 'CRITICA');
  
  if (!temFalhas) {
    return null;
  }
  
  return (
    <>
      {/* APENAS O SINO COM O BOTÃO */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
      }}>
        {/* Botão para reconhecer falhas */}
        <button 
          onClick={onReconhecer}
          style={{
            background: falhaCritica ? '#dc2626' : '#f59e0b',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'white',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          RECONHECER
        </button>
        
        {/* Sino de alerta */}
        <div style={{ 
          position: 'relative',
          opacity: sinoVisivel ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out'
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={falhaCritica ? '#dc2626' : '#f59e0b'}
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              animation: falhaCritica ? 'sinoAlerta 0.5s infinite' : 'none',
              filter: `drop-shadow(0 0 2px ${falhaCritica ? 'rgba(220, 38, 38, 0.5)' : 'rgba(245, 158, 11, 0.5)'})`
            }}
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          
          {/* Badge para número de falhas */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: falhaCritica ? '#dc2626' : '#f59e0b',
            color: 'white',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            {falhas.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertSystem;