import React from 'react';

interface ValvulaOnOffProps {
  // Status da válvula (0: INATIVO, 1: ATIVO, 2: MANUTENÇÃO, 3: FALHA)
  status?: number;
  
  // Estados dos instrumentos
  alarme?: boolean; // Alarme ativo
  
  // Customização visual
  corValvula?: string; // Cor da válvula quando ativa
  largura?: number;
  altura?: number;
  rotacao?: number; // Rotação em graus (0, 90, 180, 270, etc)
  
  // Tags dos instrumentos
  tagValvula?: string; // XV-101, XV-102, etc.
  
  // Callbacks
  onValvulaClick?: (tag: string) => void;
  onStatusChange?: (status: number) => void;
}

const ValvulaOnOff: React.FC<ValvulaOnOffProps> = ({
  status = 0,
  alarme = false,
  corValvula = '#0D46AB',
  largura = 45,
  altura = 44,
  rotacao = 0,
  tagValvula = 'XV-101',
  onValvulaClick = () => {},
  onStatusChange = () => {}
}) => {
  
  // Cores ISA 104 baseadas no status
  const getCorStatus = () => {
    if (alarme) return '#FF0000'; // Vermelho puro para alarme
    switch(status) {
      case 0: return '#808080'; // Cinza para INATIVO
      case 1: return '#000000'; // Preto para ATIVO
      case 2: return '#FFA500'; // Laranja para MANUTENÇÃO
      case 3: return '#FF0000'; // Vermelho para FALHA
      default: return '#808080';
    }
  };

  const getCorValvula = () => {
    if (alarme) return '#FF0000'; // Vermelho para alarme
    switch(status) {
      case 0: return '#C0C0C0'; // Cinza claro para INATIVO
      case 1: return corValvula; // Azul quando ATIVO
      case 2: return '#FFA500'; // Laranja para MANUTENÇÃO
      case 3: return '#FF0000'; // Vermelho para FALHA
      default: return '#C0C0C0';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 0: return 'INATIVO';
      case 1: return 'ATIVO';
      case 2: return 'MANUTENÇÃO';
      case 3: return 'FALHA';
      default: return 'INATIVO';
    }
  };

  return (
    <div className="valvula-onoff-container" style={{ display: 'inline-block' }}>
      <svg 
        width={largura} 
        height={altura} 
        viewBox="0 0 45 44" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          background: 'transparent', 
          cursor: 'pointer',
          transform: `rotate(${rotacao}deg)`,
          transformOrigin: 'center'
        }}
        onClick={() => onValvulaClick(tagValvula)}
      >
        {/* TEXTO TAG DA VÁLVULA - AGORA DINÂMICO */}
        <text 
          x="22.5" 
          y="41" 
          textAnchor="middle" 
          fontSize="8" 
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="#000000"
        >
          {tagValvula}
        </text>

        {/* VÁLVULA - ABA ESQUERDA */}
        <path 
          d="M6.125 33.6182L6.125 15.8018L21.5029 24.71L6.125 33.6182Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* VÁLVULA - ABA DIREITA */}
        <path 
          d="M38.875 15.8037L38.875 33.6201L23.4971 24.7119L38.875 15.8037Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* HASTE DA VÁLVULA */}
        <path 
          d="M22.5 24.7116L22.5 9.15234" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* ATUADOR (RETÂNGULO SUPERIOR) */}
        <rect 
          x="12.6641" 
          y="0.5" 
          width="19.6757" 
          height="8.15251" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />

        {/* ALARME VISUAL */}
        {alarme && (
          <circle 
            cx="8" cy="8" 
            r="4" 
            fill="#FF0000"
          >
            <animate 
              attributeName="opacity" 
              values="0.3;1;0.3" 
              dur="0.5s" 
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* INDICADOR DE STATUS */}
        {(status === 2 || status === 3) && (
          <circle 
            cx="37" cy="8" 
            r="4" 
            fill={status === 2 ? "#FFA500" : "#FF0000"}
          />
        )}
      </svg>
    </div>
  );
};

export default ValvulaOnOff;