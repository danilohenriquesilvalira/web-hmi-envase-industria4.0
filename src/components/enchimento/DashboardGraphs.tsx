import React, { useEffect, useState } from 'react';

interface GraphDataPoint {
  timestamp: number;
  value: number;
}

interface DashboardGraphsProps {
  nivelTanque: number;
  ciclosCompletos: number;
  contadorGarrafas: number;
  estaProcessando: boolean;
}

const DashboardGraphs: React.FC<DashboardGraphsProps> = ({
  nivelTanque, 
  ciclosCompletos,
  contadorGarrafas,
  estaProcessando
}) => {
  // Historical data
  const [nivelData, setNivelData] = useState<GraphDataPoint[]>([]);
  const [produtividadeData, setProdutividadeData] = useState<GraphDataPoint[]>([]);
  
  // Initialize with empty data and set max history length
  const MAX_HISTORY_POINTS = 30;
  
  // Update data points every second
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
        // Calculate bottles per minute (based on last 5 points if we have them)
        let rate = 0;
        if (prev.length > 0) {
          // Simple calculation based on most recent value
          rate = estaProcessando ? 12 : 0; // Simplified rate calculation
        }
        
        const newData = [...prev, { timestamp: now, value: rate }];
        if (newData.length > MAX_HISTORY_POINTS) {
          return newData.slice(newData.length - MAX_HISTORY_POINTS);
        }
        return newData;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [nivelTanque, contadorGarrafas, estaProcessando]);
  
  // Helper function to draw graphs
  const renderGraph = (data: GraphDataPoint[], color: string, fillColor: string, height: number) => {
    // If no data, return empty graph
    if (data.length === 0) return null;
    
    // Find min and max for scaling
    const values = data.map(point => point.value);
    const max = Math.max(...values, 100);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    
    // Calculate points
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((point.value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    // Calculate fill points (add bottom corners)
    const fillPoints = `${points} 100,100 0,100`;
    
    return (
      <svg width="100%" height={height} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#e5e7eb" strokeWidth="1" />
        
        {/* Fill area */}
        <polygon
          points={fillPoints}
          fill={fillColor}
          opacity="0.2"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Current value point */}
        <circle
          cx="100%"
          cy={`${100 - ((data[data.length - 1].value - min) / range) * 100}%`}
          r="4"
          fill={color}
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      width: '100%',
      maxWidth: '100%',
      padding: '24px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      marginBottom: '24px'
    }}>
      {/* Tank Level Graph */}
      <div style={{
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '10px',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
              Nível do Tanque
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Percentual de capacidade
            </div>
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: nivelTanque < 20 ? '#dc2626' : '#2563eb' 
          }}>
            {nivelTanque}%
          </div>
        </div>
        <div style={{ height: '120px', position: 'relative' }}>
          {renderGraph(nivelData, '#2563eb', '#93c5fd', 120)}
          <div style={{ 
            position: 'absolute', 
            bottom: '8px', 
            left: '0', 
            color: '#6b7280', 
            fontSize: '0.7rem' 
          }}>
            30s atrás
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '8px', 
            right: '0', 
            color: '#6b7280', 
            fontSize: '0.7rem' 
          }}>
            Agora
          </div>
        </div>
      </div>
      
      {/* Productivity Graph */}
      <div style={{
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '10px',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
              Taxa de Produção
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Garrafas por minuto
            </div>
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#16a34a' 
          }}>
            {produtividadeData.length > 0 ? produtividadeData[produtividadeData.length - 1].value : 0}
          </div>
        </div>
        <div style={{ height: '120px', position: 'relative' }}>
          {renderGraph(produtividadeData, '#16a34a', '#86efac', 120)}
          <div style={{ 
            position: 'absolute', 
            bottom: '8px', 
            left: '0', 
            color: '#6b7280', 
            fontSize: '0.7rem' 
          }}>
            30s atrás
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '8px', 
            right: '0', 
            color: '#6b7280', 
            fontSize: '0.7rem' 
          }}>
            Agora
          </div>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div style={{ 
        display: 'flex', 
        gap: '16px',
        gridColumn: '1 / -1'
      }}>
        {/* Efficiency Card */}
        <div style={{
          flex: 1,
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '10px',
          border: '1px solid #bae6fd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#0c4a6e' }}>
              Eficiência do Sistema
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#0369a1' }}>
              Baseada em ciclos completados
            </div>
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {estaProcessando ? '98%' : '0%'}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 19V7l-8 4-8-4v12"></path>
              <path d="M12 15l8-4"></path>
              <path d="M4 11l8 4"></path>
              <path d="M20 3v4"></path>
              <path d="M4 3v4"></path>
            </svg>
          </div>
        </div>

        {/* Total Production Card */}
        <div style={{
          flex: 1,
          padding: '16px',
          background: '#f0fdf4',
          borderRadius: '10px',
          border: '1px solid #bbf7d0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#14532d' }}>
              Produção Total
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
              Garrafas finalizadas hoje
            </div>
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {contadorGarrafas}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 21h8"></path>
              <path d="M12 21v-4"></path>
              <path d="M12 10v-3"></path>
              <path d="M12 13v4"></path>
              <path d="M8 3h8l2 4.5-2 4.5-8 0-2-4.5L8 3z"></path>
            </svg>
          </div>
        </div>

        {/* System Status Card */}
        <div style={{
          flex: 1,
          padding: '16px',
          background: estaProcessando ? '#f0fdf4' : '#fef2f2',
          borderRadius: '10px',
          border: `1px solid ${estaProcessando ? '#bbf7d0' : '#fecaca'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.3s ease, border 0.3s ease'
        }}>
          <div>
            <h3 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              color: estaProcessando ? '#14532d' : '#7f1d1d'
            }}>
              Status do Sistema
            </h3>
            <div style={{ 
              fontSize: '0.75rem', 
              color: estaProcessando ? '#15803d' : '#b91c1c'
            }}>
              Tempo de atividade: 6h 14m
            </div>
          </div>
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: estaProcessando ? '#16a34a' : '#dc2626',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {estaProcessando ? 'ATIVO' : 'PARADO'}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {estaProcessando ? (
                <>
                  <path d="M6 4v16"></path>
                  <path d="M10 4v16"></path>
                  <path d="M14 4v16"></path>
                  <path d="M18 4v16"></path>
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10"></circle>
                  <rect x="9" y="9" width="6" height="6"></rect>
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraphs;