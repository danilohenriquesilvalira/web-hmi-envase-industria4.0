import React from 'react';

interface StatusIndicatorsProps {
  ciclosCompletos: number;
  contadorGarrafas: number;
  nivelTanque: number;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  ciclosCompletos,
  contadorGarrafas,
  nivelTanque
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '24px',
      alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Ciclos</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb' }}>
          {ciclosCompletos.toString().padStart(3, '0')}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Garrafas</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#16a34a' }}>
          {contadorGarrafas.toString().padStart(3, '0')}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Tanque</div>
        <div style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          color: nivelTanque < 20 ? '#dc2626' : '#2563eb',
          transition: 'color 0.3s ease'
        }}>
          {nivelTanque}%
        </div>
      </div>
    </div>
  );
};

export default StatusIndicators;