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
  largura = 187,
  altura = 96,
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

  // Cor do indicador de posição (0-100%)
  const getCorIndicador = () => {
    if (alarme) return '#FF0000'; // Vermelho para alarme
    if (manutencao) return '#FFA500'; // Laranja para manutenção
    if (posicao > 0) return '#FCD903'; // AMARELO quando ativa
    return '#CFCFCF'; // Cinza quando inativa
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
        viewBox="0 0 187 96" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent', cursor: 'pointer' }}
        onClick={() => onValvulaClick(tagValvula)}
      >
        {/* FT-101 - CÍRCULO DO MEDIDOR DE FLUXO */}
        <path 
          d="M152 47.5C141.783 47.5 133.5 39.2173 133.5 29C133.5 18.7827 141.783 10.5 152 10.5C162.217 10.5 170.5 18.7827 170.5 29C170.5 39.2173 162.217 47.5 152 47.5Z" 
          fill="white" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* TEXTO FT-101 */}
        <path 
          d="M139.912 32V31.4019L140.441 31.2993V27.7275L139.912 27.625V27.0234H143.873V28.3872H143.107L143.063 27.7925H141.439V29.1631H143.183V29.9321H141.439V31.2993L141.973 31.4019V32H139.912ZM145.452 32V31.4019L145.985 31.2993V27.7925H145.08L145.025 28.3872H144.27V27.0234L148.709 27.0234V28.3872H147.951L147.896 27.7925H146.983V31.2993L147.52 31.4019V32L145.452 32ZM151.03 30.2568V29.4878H152.958V30.2568H151.03ZM155.31 32V31.4019L156.15 31.2993V27.9292H155.299V27.3584L157.145 27.0234V31.2993L157.986 31.4019V32H155.31ZM160.204 32.0718C159.685 32.0718 159.273 31.902 158.97 31.5625C158.667 31.2207 158.516 30.7205 158.516 30.062V28.9648C158.516 28.3086 158.666 27.8096 158.967 27.4678C159.27 27.1237 159.68 26.9517 160.197 26.9517C160.712 26.9517 161.121 27.1237 161.424 27.4678C161.73 27.8096 161.882 28.3086 161.882 28.9648V30.062C161.882 30.7205 161.731 31.2207 161.428 31.5625C161.127 31.902 160.719 32.0718 160.204 32.0718ZM160.204 31.3062C160.427 31.3062 160.597 31.215 160.713 31.0327C160.83 30.8504 160.888 30.5588 160.888 30.1577V28.8623C160.888 28.4658 160.828 28.1764 160.71 27.9941C160.591 27.8118 160.421 27.7207 160.197 27.7207C159.972 27.7207 159.801 27.8118 159.685 27.9941C159.568 28.1764 159.51 28.4658 159.51 28.8623V30.1577C159.51 30.5588 159.568 30.8504 159.685 31.0327C159.803 31.215 159.976 31.3062 160.204 31.3062ZM162.405 32V31.4019L163.246 31.2993V27.9292H162.395V27.3584L164.241 27.0234V31.2993L165.082 31.4019V32L162.405 32Z" 
          fill="black"
        />
        
        {/* LINHA VERTICAL DO FT */}
        <path 
          d="M152 48V82" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />

        {/* VÁLVULA MODULADORA - ABA ESQUERDA */}
        <path 
          d="M6.19141 84.1143L6.19141 66.1377L21.7588 75.126L6.19141 84.1143Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* VÁLVULA MODULADORA - ABA DIREITA */}
        <path 
          d="M38.1289 66.1377L38.1289 84.1143L22.5615 75.126L38.1289 66.1377Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* HASTE DA VÁLVULA */}
        <path 
          d="M22.1602 75.1268L22.1602 58.3594" 
          stroke={getCorStatus()}
          strokeWidth="1"
        />
        
        {/* ATUADOR PNEUMÁTICO (SEMICÍRCULO) */}
        <path 
          d="M34.6815 58.2024H8.99219C8.99219 58.2024 10.1599 46 21.8368 46C33.5138 46 34.6815 58.2024 34.6815 58.2024Z" 
          fill={getCorValvula()} 
          stroke={getCorStatus()}
          strokeWidth="1"
        />

        {/* INDICADOR DE POSIÇÃO 0-100% - FUNDO CINZA COMPLETO */}
        <path 
          d="M179.598 73.2824V4H184.402V73.2824C184.402 73.2824 187.028 75.5498 187 77.4118C186.961 79.9455 184.761 82 182 82C179.239 82 177.039 79.9455 177 77.4118C176.972 75.5498 179.598 73.2824 179.598 73.2824Z" 
          fill="#CFCFCF"
          stroke={getCorStatus()}
          strokeWidth="1"
        />

        {/* INDICADOR AMARELO - CÍRCULO DE BAIXO SEMPRE QUANDO ATIVO */}
        {posicao > 0 && (
          <circle
            cx="182"
            cy="77.4118"
            r="5"
            fill="#FCD903"
          />
        )}

        {/* INDICADOR AMARELO - RETÂNGULO PROPORCIONAL */}
        {posicao > 0 && (
          <rect
            x="179.598"
            y={73.2824 - (69.2824 * posicao / 100)}
            width="4.804"
            height={69.2824 * posicao / 100}
            fill="#FCD903"
          />
        )}

        {/* LINHAS TRACEJADAS - CONEXÃO DE INSTRUMENTAÇÃO */}
        <path 
          d="M22 45.5V0.5H152V10" 
          stroke={getCorStatus()}
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* TEXTO FCV-101 ABAIXO */}
        <path 
          d="M3.91602 95V94.1455L4.67285 93.999L4.67285 88.8965L3.91602 88.75V87.8906H9.5752V89.8389H8.48145L8.41797 88.9893H6.09863V90.9473H8.58887V92.0459H6.09863L6.09863 93.999L6.86035 94.1455L6.86035 95H3.91602ZM13.2861 95.1025C12.596 95.1025 11.9954 94.9593 11.4844 94.6729C10.9733 94.3831 10.5778 93.9746 10.2979 93.4473C10.0212 92.9167 9.88281 92.29 9.88281 91.5674V91.3281C9.88281 90.638 10.0163 90.0277 10.2832 89.4971C10.5534 88.9632 10.9375 88.5449 11.4355 88.2422C11.9336 87.9395 12.526 87.7881 13.2129 87.7881C13.6947 87.7881 14.1455 87.8564 14.5654 87.9932C14.9886 88.1299 15.3662 88.3382 15.6982 88.6182V90.3369H14.6387L14.4922 89.2578C14.3848 89.1797 14.2676 89.113 14.1406 89.0576C14.0137 89.0023 13.8753 88.96 13.7256 88.9307C13.5791 88.9014 13.4196 88.8867 13.2471 88.8867C12.8434 88.8867 12.4967 88.986 12.207 89.1846C11.9173 89.3831 11.6943 89.6647 11.5381 90.0293C11.3851 90.3906 11.3086 90.8203 11.3086 91.3184V91.5674C11.3086 92.0654 11.39 92.4967 11.5527 92.8613C11.7155 93.2259 11.9466 93.5091 12.2461 93.7109C12.5456 93.9095 12.9004 94.0088 13.3105 94.0088C13.5156 94.0088 13.7207 93.986 13.9258 93.9404C14.1341 93.8916 14.3229 93.8298 14.4922 93.7549L14.6387 92.7539H15.6982L15.6982 94.4531C15.4215 94.6354 15.0765 94.79 14.6631 94.917C14.2497 95.0407 13.7907 95.1025 13.2861 95.1025ZM19.1699 95L16.8848 88.8281L16.25 88.75V87.8906H19.0771V88.75L18.4375 88.8477L19.834 93.042L19.9414 93.4326H19.9707L20.0732 93.0518L21.4697 88.8477L20.7227 88.75V87.8906H23.418V88.75L22.7734 88.8281L20.6299 95H19.1699ZM23.4521 92.5098V91.4111H26.2061V92.5098H23.4521ZM27.1143 95V94.1455L28.3154 93.999V89.1846H27.0996V88.3691L29.7363 87.8906V93.999L30.9375 94.1455V95H27.1143ZM34.1064 95.1025C33.3643 95.1025 32.7767 94.86 32.3438 94.375C31.9108 93.8867 31.6943 93.1722 31.6943 92.2314V90.6641C31.6943 89.7266 31.9092 89.0137 32.3389 88.5254C32.7718 88.0339 33.3577 87.7881 34.0967 87.7881C34.8324 87.7881 35.4167 88.0339 35.8496 88.5254C36.2858 89.0137 36.5039 89.7266 36.5039 90.6641V92.2314C36.5039 93.1722 36.2874 93.8867 35.8545 94.375C35.4248 94.86 34.8421 95.1025 34.1064 95.1025ZM34.1064 94.0088C34.4255 94.0088 34.668 93.8786 34.834 93.6182C35 93.3577 35.083 92.9411 35.083 92.3682V90.5176C35.083 89.9512 34.9984 89.5378 34.8291 89.2773C34.6598 89.0169 34.4157 88.8867 34.0967 88.8867C33.7744 88.8867 33.5303 89.0169 33.3643 89.2773C33.1982 89.5378 33.1152 89.9512 33.1152 90.5176V92.3682C33.1152 92.9411 33.1982 93.3577 33.3643 93.6182C33.5335 93.8786 33.7809 94.0088 34.1064 94.0088ZM37.251 95V94.1455L38.4521 93.999V89.1846H37.2363V88.3691L39.873 87.8906V93.999L41.0742 94.1455V95H37.251Z" 
          fill="black"
        />

        {/* ALARME VISUAL */}
        {alarme && (
          <circle 
            cx="30" cy="30" 
            r="6" 
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

        {/* SÍMBOLO DE MANUTENÇÃO */}
        {manutencao && (
          <circle 
            cx="160" cy="60" 
            r="6" 
            fill="#FFA500"
          />
        )}

      </svg>

      {/* INFORMAÇÕES DO FLUXO - EM CIMA DO FT */}
      <div style={{
        position: 'absolute',
        top: '-25px',
        left: '120px',
        textAlign: 'center',
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif',
        color: getCorStatus(),
        fontWeight: 'bold'
      }}>
        {fluxo > 0 && <div>{fluxo.toFixed(0)} L/min</div>}
      </div>

      {/* PORCENTAGEM - EMBAIXO DA VÁLVULA MODULADORA */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '15px',
        textAlign: 'center',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: getCorStatus(),
        fontWeight: 'bold'
      }}>
        {posicao.toFixed(0)}%
      </div>
    </div>
  );
};

export default FcvModuladora;
