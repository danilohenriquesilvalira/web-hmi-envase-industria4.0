import React, { useState, useEffect } from 'react';

interface GraphDataPoint {
  timestamp: number;
  value: number;
}

interface DashboardCompactProps {
  nivelTanque: number;
  ciclosCompletos: number;
  contadorGarrafas: number;
  estaProcessando: boolean;
  currentTime: string;
  userName: string;
}

const DashboardCompact: React.FC<DashboardCompactProps> = ({
  nivelTanque, 
  ciclosCompletos,
  contadorGarrafas,
  estaProcessando,
  currentTime,
  userName
}) => {
  // Historical data
  const [nivelData, setNivelData] = useState<GraphDataPoint[]>([]);
  const [produtividadeData, setProdutividadeData] = useState<GraphDataPoint[]>([]);
  const [eficienciaData, setEficienciaData] = useState<GraphDataPoint[]>([]);
  
  // Calculate efficiency
  const [eficiencia, setEficiencia] = useState(98);
  
  // Initialize with empty data and set max history length
  const MAX_HISTORY_POINTS = 20;
  
  // Update data points periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Update tank level history
      setNivelData(prev => {
        const newData = [...prev, { timestamp: now, value: nivelTanque }];
        if (newData.length > MAX_HISTORY_POINTS) {
          return newData.slice(newData.length - MAX_HISTORY_POINTS);
        }
        return newData;
      });
      
      // Update productivity history
      setProdutividadeData(prev => {
        // Calculate bottles per minute (approximation)
        const rate = estaProcessando ? 12 : 0;
        
        const newData = [...prev, { timestamp: now, value: rate }];
        if (newData.length > MAX_HISTORY_POINTS) {
          return newData.slice(newData.length - MAX_HISTORY_POINTS);
        }
        return newData;
      });
      
      // Update efficiency history with small variations if running
      setEficienciaData(prev => {
        let currentEfficiency = eficiencia;
        if (estaProcessando) {
          // Small random variations when running
          currentEfficiency = Math.min(100, Math.max(94, eficiencia + (Math.random() * 2 - 1)));
        } else {
          currentEfficiency = 0;
        }
        
        setEficiencia(currentEfficiency);
        
        const newData = [...prev, { timestamp: now, value: currentEfficiency }];
        if (newData.length > MAX_HISTORY_POINTS) {
          return newData.slice(newData.length - MAX_HISTORY_POINTS);
        }
        return newData;
      });
      
    }, 1000);
    
    return () => clearInterval(interval);
  }, [nivelTanque, contadorGarrafas, estaProcessando, eficiencia]);
  
  // Helper function to draw sparkline charts
  const renderSparkline = (data: GraphDataPoint[], color: string, height: number = 30) => {
    if (data.length <= 1) return null;
    
    // Find min and max for scaling
    const values = data.map(point => point.value);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    
    // Calculate points
    const points = data.map((point, index) => {
      const x = (index / (Math.max(1, data.length - 1))) * 100;
      const y = height - ((point.value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="100%" height={height} style={{ overflow: 'visible' }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        {/* Current value marker */}
        {data.length > 0 && (
          <circle
            cx="100%"
            cy={height - ((data[data.length - 1].value - min) / range) * height}
            r="2"
            fill={color}
          />
        )}
      </svg>
    );
  };
  
  // Calculate productivity rate
  const produtividadeAtual = produtividadeData.length > 0 
    ? produtividadeData[produtividadeData.length - 1].value 
    : 0;
  
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
    }}>
      <div style={{
        gridColumn: '1 / -1',
        padding: '12px',
        background: '#f8fafc',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: '#64748b',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #e2e8f0'
      }}>
        <div>Relatório em tempo real • Atualizado {currentTime}</div>
        <div>Operador: {userName}</div>
      </div>

      {/* Productivity Chart */}
      <div style={{
        padding: '12px',
        borderRadius: '8px',
        background: '#f0fdf4',
        border: '1px solid #dcfce7'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#14532d', fontWeight: 'bold' }}>Produção por Minuto</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>{produtividadeAtual}</div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
        </div>
        <div style={{ height: '30px' }}>
          {renderSparkline(produtividadeData, '#16a34a')}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#65a30d', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Total: {contadorGarrafas}</span>
          <span>Ciclos: {ciclosCompletos}</span>
        </div>
      </div>

      {/* Tank Level Chart */}
      <div style={{
        padding: '12px',
        borderRadius: '8px',
        background: nivelTanque < 20 ? '#fef2f2' : '#f0f9ff',
        border: `1px solid ${nivelTanque < 20 ? '#fee2e2' : '#e0f2fe'}`,
        transition: 'background 0.3s ease, border 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: nivelTanque < 20 ? '#7f1d1d' : '#0c4a6e', 
              fontWeight: 'bold' 
            }}>
              Nível do Tanque
            </div>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: nivelTanque < 20 ? '#dc2626' : '#0284c7' 
            }}>
              {nivelTanque}%
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                 stroke={nivelTanque < 20 ? '#dc2626' : '#0284c7'} 
                 strokeWidth="2" 
                 strokeLinecap="round" 
                 strokeLinejoin="round">
              <path d="M19 10c.34.5.66 1 .66 2.5 0 2.5-2 4.5-4.5 4.5H9.5C6.5 17 4 14.5 4 11.5 4 8 7 6 9.5 6h5c3 0 5 2 5 5"></path>
              <path d="M13 6h2"></path>
              <path d="M13 18h2"></path>
            </svg>
          </div>
        </div>
        <div style={{ height: '30px' }}>
          {renderSparkline(nivelData, nivelTanque < 20 ? '#dc2626' : '#0284c7')}
        </div>
        <div style={{ 
          fontSize: '0.7rem', 
          color: nivelTanque < 20 ? '#b91c1c' : '#0369a1', 
          marginTop: '4px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Consumo por garrafa: 5%</span>
          <span>{nivelTanque < 20 ? 'Nível crítico!' : 'Nível OK'}</span>
        </div>
      </div>

      {/* Efficiency Gauge */}
      <div style={{
        gridColumn: '1 / -1',
        padding: '12px',
        borderRadius: '8px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 'bold' }}>
              Eficiência do Sistema
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: estaProcessando ? '#15803d' : '#64748b' 
            }}>
              {estaProcessando ? Math.round(eficiencia) : 0}%
            </div>
          </div>
          
          {/* Progress bar */}
          <div style={{ 
            height: '8px', 
            background: '#e2e8f0', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${estaProcessando ? eficiencia : 0}%`,
              background: estaProcessando ? '#22c55e' : '#94a3b8',
              borderRadius: '4px',
              transition: 'width 1s ease-in-out, background 0.3s ease'
            }} />
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.7rem', 
            color: '#64748b',
            marginTop: '4px'
          }}>
            <div>Status: {estaProcessando ? 'Operando' : 'Parado'}</div>
            <div>{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
        
        {/* Status Icon */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '20px',
          background: estaProcessando ? '#dcfce7' : '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke={estaProcessando ? '#16a34a' : '#64748b'} 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round">
            {estaProcessando ? (
              <>
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M4.93 4.93l2.83 2.83"></path>
                <path d="M16.24 16.24l2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="M4.93 19.07l2.83-2.83"></path>
                <path d="M16.24 7.76l2.83-2.83"></path>
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompact;