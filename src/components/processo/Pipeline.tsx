import React from 'react';

interface PipelineProps {
  // Controle individual de cada linha (0: INATIVO, 1: ATIVO)
  linha1?: number; // Linha vertical direita
  linha2?: number; // Linha horizontal direita
  linha3?: number; // Linha válvula FCV
  linha4?: number; // Linha tanque para bomba
  linha5?: number; // Linha bomba para válvula
  linha6?: number; // Seta direção
  linha7?: number; // Linha inicial
  linha8?: number; // Linha final
  
  // Customização visual
  largura?: number;
  altura?: number;
  corAtivo?: string;
  corInativo?: string;
  
  // Velocidade da animação
  velocidadeAnimacao?: number;
}

const Pipeline: React.FC<PipelineProps> = ({
  linha1 = 0,
  linha2 = 0,
  linha3 = 0,
  linha4 = 0,
  linha5 = 0,
  linha6 = 0,
  linha7 = 0,
  linha8 = 0,
  largura = 859,
  altura = 211,
  corAtivo = '#00FF00',
  corInativo = '#808080',
  velocidadeAnimacao = 2
}) => {
  
  // Cores ISA 104
  const getCorLinha = (status: number) => {
    return status === 1 ? corAtivo : corInativo;
  };

  // Verde = sólido, cinza = pode ser sólido também
  const getStrokeDasharray = (status: number) => {
    return "none"; // Sempre sólido
  };

  return (
    <div className="pipeline-container" style={{ display: 'inline-block' }}>
      <svg 
        width={largura} 
        height={altura} 
        viewBox="0 0 859 211" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: 'transparent' }}
      >
        
        {/* LINHA 1 - Vertical direita */}
        <path 
          d="M858.5 0.5V81.5" 
          stroke={getCorLinha(linha1)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha1)}
        >
          {linha1 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 2 - Horizontal direita */}
        <path 
          d="M858 114.5V210H803" 
          stroke={getCorLinha(linha2)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha2)}
        >
          {linha2 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 3 - Válvula FCV com símbolos */}
        <path 
          d="M517 191.5L625 191.5M638.5 191.5L714 191.5M625 197.5L625 185.5M638.5 197.5L638.5 185.5" 
          stroke={getCorLinha(linha3)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha3)}
        >
          {linha3 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 4 - Tanque para bomba */}
        <path 
          d="M360.5 192.5H164.227" 
          stroke={getCorLinha(linha4)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha4)}
        >
          {linha4 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 5 - Bomba para válvula */}
        <path 
          d="M370 192.5H484.5" 
          stroke={getCorLinha(linha5)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha5)}
        >
          {linha5 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 6 - Seta direção do fluxo */}
        <path 
          d="M360 192.5L371.25 186.005L371.25 198.995L360 192.5Z" 
          fill={getCorLinha(linha6)}
          stroke={getCorLinha(linha6)}
          strokeWidth="1"
        >
          {linha6 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.5;1;0.5" 
              dur={`${velocidadeAnimacao / 2}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 7 - Seta inicial */}
        <path 
          d="M-3.27835e-07 192.5L11.25 186.005L11.25 198.995L-3.27835e-07 192.5Z" 
          fill={getCorLinha(linha7)}
          stroke={getCorLinha(linha7)}
          strokeWidth="1"
        >
          {linha7 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.5;1;0.5" 
              dur={`${velocidadeAnimacao / 2}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LINHA 8 - Linha inicial */}
        <path 
          d="M131 192.5L11 192.5" 
          stroke={getCorLinha(linha8)}
          strokeWidth="2"
          strokeDasharray={getStrokeDasharray(linha8)}
        >
          {linha8 === 1 && (
            <animate 
              attributeName="opacity" 
              values="0.7;1;0.7" 
              dur={`${velocidadeAnimacao}s`} 
              repeatCount="indefinite"
            />
          )}
        </path>

      </svg>
    </div>
  );
};

export default Pipeline;