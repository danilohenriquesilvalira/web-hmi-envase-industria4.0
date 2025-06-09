import React from 'react';

interface TanqueEnchimentoSlimProps {
  nivel: number;
  cor?: string;
  pistaoAvancado: boolean;
}

const TanqueEnchimentoSlim: React.FC<TanqueEnchimentoSlimProps> = ({
  nivel,
  cor = '#3B82F6',
  pistaoAvancado
}) => {
  const alturaLiquido = (nivel / 100) * 141.8;
  const yLiquido = 193.9 - alturaLiquido;
  const pistaoOffset = pistaoAvancado ? 15 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-700 mb-2">ENCHIMENTO</div>
      <svg 
        width="120" 
        height="250" 
        viewBox="0 0 195 355" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* SVG EXATO do original */}
        <path 
          d="M45 30.2528V19.2528H75V4.75278C75 4.75278 75.5 1 82 1H118C124.5 1 124.5 4.75278 124.5 4.75278V19.2528H150V30.2528H194V188.752L131.5 280.752V305.752H69V280.752L1 188.752V30.2528H45Z" 
          fill="#D9D9D9"
        />
        
        <path 
          d="M45 30.2528V19.2528H75M45 30.2528H1V188.752L69 280.752V305.752H131.5V280.752L194 188.752V30.2528H150M45 30.2528H150M75 19.2528V4.75278M75 19.2528H124.5M75 4.75278C75 4.75278 75.5 1 82 1C88.5 1 111.5 1 118 1C124.5 1 124.5 4.75278 124.5 4.75278M75 4.75278H124.5M124.5 4.75278V19.2528M124.5 19.2528H150V30.2528" 
          stroke="black" 
          strokeWidth="0.2"
        />
        
        <rect 
          x="21.1" 
          y="52.1" 
          width="28.8" 
          height="141.8" 
          stroke="black" 
          strokeWidth="0.2"
        />
        
        {/* Líquido no visor */}
        <rect 
          x="21.1" 
          y={yLiquido} 
          width="28.8" 
          height={alturaLiquido} 
          fill={cor} 
          className="transition-all duration-1000"
        />
        
        {/* Sistema pistão com movimento */}
        <g transform={`translate(0, ${pistaoOffset})`} className="transition-all duration-500">
          <path 
            d="M113 157H115V149H110.072L109 145H93.5718L92.5 149H87.5V157H90M113 157V210H116.5V219L120.253 225.5M113 157H90M120.253 225.5H82M120.253 225.5V256M82 225.5L85.7528 219V210H90V157M82 225.5V256M82 256L96 255.732V247.5H107V256H120.253M82 256V262.5M120.253 256V262.5M82 262.5V305.5H93.5H120.253V262.5M82 262.5H120.253" 
            stroke="black" 
            strokeWidth="0.5"
          />
          
          <path 
            d="M109 306V341.01L101.5 354L94 341.01V306H109Z" 
            fill="#C4C4C4" 
            stroke="black" 
            strokeWidth="0.5"
          />
        </g>

        {/* Efeito spray no bico quando pistão avançado */}
        {pistaoAvancado && nivel > 0 && (
          <g>
            {/* Jato principal */}
            <ellipse 
              cx="101.5" 
              cy={365 + pistaoOffset} 
              rx="1.5" 
              ry="6" 
              fill={cor} 
              opacity="0.7"
            />
            
            {/* Gotas animadas */}
            <circle cx="101.5" cy={370 + pistaoOffset} r="0.8" fill={cor} opacity="0.6">
              <animate attributeName="cy" values={`${370 + pistaoOffset};${385 + pistaoOffset};${370 + pistaoOffset}`} dur="0.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            
            <circle cx="99.5" cy={372 + pistaoOffset} r="0.6" fill={cor} opacity="0.5">
              <animate attributeName="cy" values={`${372 + pistaoOffset};${387 + pistaoOffset};${372 + pistaoOffset}`} dur="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite"/>
            </circle>
            
            <circle cx="103.5" cy={372 + pistaoOffset} r="0.6" fill={cor} opacity="0.5">
              <animate attributeName="cy" values={`${372 + pistaoOffset};${387 + pistaoOffset};${372 + pistaoOffset}`} dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite"/>
            </circle>
          </g>
        )}

        {/* Porcentagem corretamente posicionada */}
        <text 
          x="15" 
          y="45" 
          fontSize="10" 
          fontWeight="bold" 
          fill="#374151" 
          className="font-mono"
        >
          {nivel.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default TanqueEnchimentoSlim;