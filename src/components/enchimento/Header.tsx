import React from 'react';
import StatusIndicators from './StatusIndicators';
import AlertSystem from './AlertSystem';
import ControlPanel from './ControlPanel';
import UserProfile from './UserProfile';

interface HeaderProps {
  processoAtivo: boolean;
  processoEmRecuperacao: boolean;
  ciclosCompletos: number;
  contadorGarrafas: number;
  nivelTanque: number;
  falhas: any[];
  onIniciarParar: () => void;
  onResetSistema: () => void;
  onReconhecerFalhas: () => void;
  onReabastecerTanque: () => void;
  tanqueBaixo: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  processoAtivo,
  processoEmRecuperacao,
  ciclosCompletos, 
  contadorGarrafas,
  nivelTanque,
  falhas,
  onIniciarParar,
  onResetSistema,
  onReconhecerFalhas,
  onReabastecerTanque,
  tanqueBaixo
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 24px'
    }}>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* Título e Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 21h8"></path>
              <path d="M12 21v-4"></path>
              <path d="M12 10v-3"></path>
              <path d="M12 13v4"></path>
              <path d="M8 3h8l2 4.5-2 4.5-8 0-2-4.5L8 3z"></path>
            </svg>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Sistema de Envase
            </h1>
          </div>
          
          <div style={{
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            background: processoAtivo ? '#16a34a' : processoEmRecuperacao ? '#f59e0b' : '#dc2626',
            color: 'white'
          }}>
            {processoAtivo ? 'OPERANDO' : processoEmRecuperacao ? 'RECUPERANDO' : 'PARADO'}
          </div>
        </div>

        {/* Contadores */}
        <StatusIndicators 
          ciclosCompletos={ciclosCompletos}
          contadorGarrafas={contadorGarrafas}
          nivelTanque={nivelTanque}
        />

        {/* Alertas + Botões */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Sistema de Alerta */}
          <AlertSystem 
            falhas={falhas}
            onReconhecer={onReconhecerFalhas}
            onResetSistema={onResetSistema}
          />
          
          {/* Botão para reabastecimento */}
          {tanqueBaixo && (
            <button
              onClick={onReabastecerTanque}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                background: '#2563eb',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10"></path>
                <path d="M18 14l-6-6-6 6"></path>
              </svg>
              ABASTECER
            </button>
          )}

          {/* Painel de Controle */}
          <ControlPanel 
            processoAtivo={processoAtivo}
            onIniciarParar={onIniciarParar}
            onResetSistema={onResetSistema}
          />

          {/* User Profile */}
          <UserProfile name="Danilo Lira" role="Desenvolvedor" />
        </div>
      </div>
    </div>
  );
};

export default Header;