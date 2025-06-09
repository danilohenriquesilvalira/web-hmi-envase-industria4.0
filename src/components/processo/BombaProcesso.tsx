import React from 'react';

interface BombaProcessoProps {
  // Parâmetros do processo
  ativo?: boolean; // Bomba ligada/desligada
  pressao?: number; // bar
  fluxo?: number; // L/min
  rotacao?: number; // RPM
  
  // Estados dos instrumentos
  alarme?: boolean; // Alarme ativo
  manutencao?: boolean; // Em manutenção
  
  // Customização visual
  corBomba?: string; // Cor da bomba quando ativa
  largura?: number;
  altura?: number;
  
  // Tags dos instrumentos
  tagBomba?: string; // P-101, P-102, etc.
  
  // Callbacks
  onBombaClick?: (tag: string) => void;
  onStatusChange?: (ativo: boolean) => void;
}

const BombaProcesso: React.FC<BombaProcessoProps> = ({
  ativo = false,
  pressao = 0,
  fluxo = 0,
  rotacao = 0,
  alarme = false,
  manutencao = false,
  corBomba = '#7886A0',
  largura = 89,
  altura = 68,
  tagBomba = 'P-101',
  onBombaClick = () => {},
  onStatusChange = () => {}
}) => {
  
  // Cores ISA 104
  const getCorStatus = () => {
    if (alarme) return '#e74c3c'; // Vermelho para alarme
    if (manutencao) return '#f39c12'; // Laranja para manutenção
    if (ativo) return '#2c3e50'; // Preto para ativo
    return '#95a5a6'; // Cinza para inativo
  };

  const getCorBomba = () => {
    if (alarme) return '#e74c3c'; // Vermelho para alarme
    if (manutencao) return '#f39c12'; // Laranja para manutenção
    if (ativo) return corBomba; // Cor normal quando ativa
    return '#bdc3c7'; // Cinza claro quando inativa
  };

  const getStatusText = () => {
    if (alarme) return 'ALARME';
    if (manutencao) return 'MANUTENÇÃO';
    if (ativo) return 'ATIVO';
    return 'PARADO';
  };

  return (
    <div className="bomba-processo-container" style={{ display: 'inline-block' }}>
      <svg 
        width={largura} 
        height={altura} 
        viewBox={`0 0 ${largura} ${altura}`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent', cursor: 'pointer' }}
        onClick={() => onBombaClick(tagBomba)}
      >
        {/* SVG ORIGINAL DA BOMBA - CORES DINÂMICAS ISA 104 */}
        <path 
          d="M55.0653 67C36.8759 67 22.1306 52.2254 22.1306 34C22.1306 30.5666 22.6539 27.2556 23.6249 24.1429H1.00164L1 2.92863H43.9445C47.4184 1.68016 51.1626 1 55.0653 1C73.2546 1 88 15.7746 88 34C88 52.2254 73.2546 67 55.0653 67Z" 
          fill={getCorBomba()}
        />
        
        <path 
          d="M43.9445 2.92863C47.4184 1.68016 51.1626 1 55.0653 1C73.2546 1 88 15.7746 88 34C88 52.2254 73.2546 67 55.0653 67C36.8759 67 22.1306 52.2254 22.1306 34C22.1306 30.5666 22.6539 27.2556 23.6249 24.1429M43.9445 2.92863H1L1.00164 24.1429H23.6249M43.9445 2.92863C34.2774 6.40274 26.7025 14.2775 23.6249 24.1429M55.0653 27.5714C51.5219 27.5714 48.6494 30.4496 48.6494 34C48.6494 37.5504 51.5219 40.4286 55.0653 40.4286C58.6087 40.4286 61.4811 37.5504 61.4811 34C61.4811 30.4496 58.6087 27.5714 55.0653 27.5714Z" 
          stroke={getCorStatus()} 
          strokeWidth="1"
        />

        {/* ROTOR ANIMADO QUANDO ATIVO */}
        {ativo && (
          <g id="rotor-animado">
            <circle 
              cx="55.0653" 
              cy="34" 
              r="6" 
              fill={getCorStatus()}
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 55.0653 34"
                to="360 55.0653 34"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Pás do rotor */}
            <g>
              <line x1="49" y1="34" x2="61" y2="34" stroke="white" strokeWidth="1"/>
              <line x1="55.0653" y1="28" x2="55.0653" y2="40" stroke="white" strokeWidth="1"/>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 55.0653 34"
                to="360 55.0653 34"
                dur="1s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        )}

        {/* INDICADOR DE FLUXO */}
        {ativo && fluxo > 0 && (
          <g id="indicador-fluxo">
            {/* Setas de fluxo animadas */}
            <polygon 
              points="75,30 80,34 75,38" 
              fill={getCorStatus()}
            >
              <animate 
                attributeName="opacity" 
                values="0.3;1;0.3" 
                dur="0.8s" 
                repeatCount="indefinite"
              />
            </polygon>
            
            <polygon 
              points="82,30 87,34 82,38" 
              fill={getCorStatus()}
            >
              <animate 
                attributeName="opacity" 
                values="0.3;1;0.3" 
                dur="0.8s" 
                begin="0.2s"
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        )}

        {/* ALARME VISUAL */}
        {alarme && (
          <circle 
            cx="20" cy="15" 
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
      </svg>

      {/* INFORMAÇÕES DA BOMBA */}
      <div style={{
        textAlign: 'center',
        marginTop: '5px',
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Tag da bomba */}
        <div style={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: getCorStatus(),
          marginBottom: '2px'
        }}>
          {tagBomba}
        </div>

        {/* Status */}
        <div style={{
          fontSize: '9px',
          color: getCorStatus(),
          fontWeight: 'bold'
        }}>
          {getStatusText()}
        </div>

        {/* Dados do processo quando ativa */}
        {ativo && (
          <div style={{
            fontSize: '8px',
            color: '#34495e',
            marginTop: '2px'
          }}>
            <div>{pressao.toFixed(1)} bar</div>
            <div>{fluxo.toFixed(0)} L/min</div>
            {rotacao > 0 && <div>{rotacao} RPM</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BombaProcesso;