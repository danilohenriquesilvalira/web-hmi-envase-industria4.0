import React from 'react';

interface FcvModuladoraProps {
  // Parâmetros do processo
  posicao?: number; // Posição da válvula 0-100%
  pressaoEntrada?: number; // bar
  pressaoSaida?: number; // bar
  fluxo?: number; // L/min
  
  // Estados dos instrumentos
  alarme?: boolean; // Alarme ativo
  manutencao?: boolean; // Em manutenção
  
  // Customização visual
  corValvula?: string; // Cor da válvula quando ativa
  largura?: number;
  altura?: number;
  
  // Tags dos instrumentos
  tagValvula?: string; // FCV-101, FCV-102, etc.
  
  // Callbacks
  onValvulaClick?: (tag: string) => void;
  onPosicaoChange?: (posicao: number) => void;
}

const FcvModuladora: React.FC<FcvModuladoraProps> = ({
  posicao = 0,
  pressaoEntrada = 0,
  pressaoSaida = 0,
  fluxo = 0,
  alarme = false,
  manutencao = false,
  corValvula = '#00FF09',
  largura = 45,
  altura = 42,
  tagValvula = 'FCV-101',
  onValvulaClick = () => {},
  onPosicaoChange = () => {}
}) => {
  
  // Cores ISA 104 - PADRÃO RIGOROSO PARA FCV
  const getCorStatus = () => {
    if (alarme) return '#FF0000'; // Vermelho puro para alarme
    if (manutencao) return '#FFA500'; // Laranja para manutenção
    if (posicao > 0) return '#000000'; // Preto para ativo
    return '#808080'; // Cinza para fechada
  };

  const getCorValvula = () => {
    if (alarme) return '#FF0000'; // Vermelho para alarme
    if (manutencao) return '#FFA500'; // Laranja para manutenção
    if (posicao > 0) return '#FFFFFF'; // BRANCO quando ativa (padrão ISA-104)
    return '#C0C0C0'; // Cinza claro quando fechada
  };

  const getStatusText = () => {
    if (alarme) return 'ALARME';
    if (manutencao) return 'MANUTENÇÃO';
    if (posicao === 0) return 'FECHADA';
    if (posicao === 100) return 'ABERTA';
    return `${posicao.toFixed(0)}%`;
  };

  return (
    <div className="fcv-moduladora-container" style={{ display: 'inline-block' }}>
      <svg 
        width={largura} 
        height={altura} 
        viewBox="0 0 45 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent', cursor: 'pointer' }}
        onClick={() => onValvulaClick(tagValvula)}
      >
        {/* SVG ORIGINAL DA FCV MODULADORA - CORES DINÂMICAS ISA 104 */}
        <path 
          d="M6.53125 39.2666L6.53125 21.29L22.0986 30.2783L6.53125 39.2666Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <path 
          d="M38.4687 21.29L38.4687 39.2666L22.9014 30.2783L38.4687 21.29Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <path 
          d="M22.5 30.2792L22.5 13.5117" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        <path 
          d="M35.0213 13.3548L9.33203 13.3548C9.33203 13.3548 10.4997 1.15234 22.1767 1.15234C33.8537 1.15234 35.0213 13.3548 35.0213 13.3548Z" 
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

        {/* Status/Posição */}
        <div style={{
          fontSize: '9px',
          color: getCorStatus(),
          fontWeight: 'bold'
        }}>
          {getStatusText()}
        </div>

        {/* Dados do processo quando ativa */}
        {posicao > 0 && (
          <div style={{
            fontSize: '8px',
            color: '#34495e',
            marginTop: '2px'
          }}>
            <div>{pressaoEntrada.toFixed(1)} bar</div>
            {pressaoSaida > 0 && <div>{pressaoSaida.toFixed(1)} bar</div>}
            {fluxo > 0 && <div>{fluxo.toFixed(0)} L/min</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FcvModuladora;