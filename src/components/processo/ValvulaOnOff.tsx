import React from 'react';

interface ValvulaOnOffProps {
  // Parâmetros do processo
  aberta?: boolean; // Válvula aberta/fechada
  pressaoEntrada?: number; // bar
  pressaoSaida?: number; // bar
  
  // Estados dos instrumentos
  alarme?: boolean; // Alarme ativo
  manutencao?: boolean; // Em manutenção
  
  // Customização visual
  corValvula?: string; // Cor da válvula quando aberta
  largura?: number;
  altura?: number;
  
  // Tags dos instrumentos
  tagValvula?: string; // XV-101, XV-102, etc.
  
  // Callbacks
  onValvulaClick?: (tag: string) => void;
  onStatusChange?: (aberta: boolean) => void;
}

const ValvulaOnOff: React.FC<ValvulaOnOffProps> = ({
  aberta = false,
  pressaoEntrada = 0,
  pressaoSaida = 0,
  alarme = false,
  manutencao = false,
  corValvula = '#22FF00',
  largura = 45,
  altura = 36,
  tagValvula = 'XV-101',
  onValvulaClick = () => {},
  onStatusChange = () => {}
}) => {
  
  // Cores ISA 104
  const getCorStatus = () => {
    if (alarme) return '#e74c3c'; // Vermelho para alarme
    if (manutencao) return '#f39c12'; // Laranja para manutenção
    if (aberta) return '#2c3e50'; // Preto para aberta
    return '#95a5a6'; // Cinza para fechada
  };

  const getCorValvula = () => {
    if (alarme) return '#e74c3c'; // Vermelho para alarme
    if (manutencao) return '#f39c12'; // Laranja para manutenção
    if (aberta) return corValvula; // Verde quando aberta
    return '#bdc3c7'; // Cinza claro quando fechada
  };

  const getStatusText = () => {
    if (alarme) return 'ALARME';
    if (manutencao) return 'MANUTENÇÃO';
    if (aberta) return 'ABERTA';
    return 'FECHADA';
  };

  return (
    <div className="valvula-onoff-container" style={{ display: 'inline-block' }}>
      <svg 
        width={largura} 
        height={altura} 
        viewBox="0 0 45 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent', cursor: 'pointer' }}
        onClick={() => onValvulaClick(tagValvula)}
      >
        {/* SVG ORIGINAL DA VÁLVULA - CORES DINÂMICAS ISA 104 */}
        <path 
          d="M6.125 33.6201L6.125 15.8037L21.5029 24.7119L6.125 33.6201Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <path 
          d="M38.875 15.8037L38.875 33.6201L23.4971 24.7119L38.875 15.8037Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <path 
          d="M22.5 24.7116L22.5 9.15234" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <rect 
          x="12.6641" 
          y="0.5" 
          width="19.6757" 
          height="8.1525" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />

        {/* ALARME VISUAL */}
        {alarme && (
          <circle 
            cx="8" cy="8" 
            r="4" 
            fill="#e74c3c"
          >
            <animate 
              attributeName="opacity" 
              values="0.3;1;0.3" 
              dur="0.5s" 
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* SÍMBOLO DE MANUTENÇÃO */}
        {manutencao && (
          <circle 
            cx="37" cy="8" 
            r="4" 
            fill="#f39c12"
          />
        )}
      </svg>

      {/* INFORMAÇÕES DA VÁLVULA */}
      <div style={{
        textAlign: 'center',
        marginTop: '5px',
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Tag da válvula */}
        <div style={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: getCorStatus(),
          marginBottom: '2px'
        }}>
          {tagValvula}
        </div>

        {/* Status */}
        <div style={{
          fontSize: '9px',
          color: getCorStatus(),
          fontWeight: 'bold'
        }}>
          {getStatusText()}
        </div>

        {/* Dados do processo quando aberta */}
        {aberta && (
          <div style={{
            fontSize: '8px',
            color: '#34495e',
            marginTop: '2px'
          }}>
            <div>{pressaoEntrada.toFixed(1)} bar</div>
            {pressaoSaida > 0 && <div>{pressaoSaida.toFixed(1)} bar</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValvulaOnOff;