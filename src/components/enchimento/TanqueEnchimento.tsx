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
  const alturaLiquido = (nivel / 100) * 141;
  const yLiquido = 193.5 - alturaLiquido;
  const pistaoOffset = pistaoAvancado ? 15 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-700 mb-2">ENCHIMENTO</div>
      <svg 
        width="120" 
        height="250" 
        viewBox="0 0 195 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path 
          d="M45 30.2528H1V188.752L69 280.752V305.752H131.5V280.752L194 188.752V30.2528H45Z" 
          fill="#E5E7EB" 
          stroke="#6B7280" 
          strokeWidth="2"
        />
        
        <path 
          d="M45 30.2528V19.2528H75M45 30.2528H150M75 19.2528V4.75278M75 19.2528H124.5M75 4.75278C75 4.75278 75.5 1 82 1C88.5 1 111.5 1 118 1C124.5 1 124.5 4.75278 124.5 4.75278M75 4.75278H124.5M124.5 4.75278V19.2528M124.5 19.2528H150V30.2528" 
          stroke="#374151" 
          strokeWidth="2" 
          fill="#F3F4F6"
        />
        
        <rect x="19.5" y="52.5" width="28" height="141" fill="#F9FAFB" stroke="#6B7280" strokeWidth="2"/>
        <rect x="20.5" y={yLiquido} width="26" height={alturaLiquido} fill={cor} className="transition-all duration-1000"/>
        
        <g className="transition-all duration-500" transform={`translate(0, ${pistaoOffset})`}>
          <path 
            d="M118.253 225.5L114.5 219V210H111V157H113V149H108.072L107 145H91.5718L90.5 149H85.5V157H88V210H83.7528V219L80 225.5M118.253 225.5H80M118.253 225.5V256M80 225.5V256M80 256H91.5V247.5H106V256H118.253M80 256V305.5H91.5H118.253V256" 
            stroke="#374151" 
            strokeWidth="2" 
            fill="#D1D5DB"
          />
          <path 
            d="M107 306V341.01L99.5 354L92 341.01V306H107Z" 
            stroke="#374151" 
            strokeWidth="2" 
            fill="#9CA3AF"
          />
        </g>
        
        {pistaoAvancado && nivel > 0 && (
          <circle cx="99.5" cy={369 + pistaoOffset} r="3" fill={cor} className="animate-ping"/>
        )}
        
        <text x="100" y="120" fontSize="20" fontWeight="bold" fill="#374151" textAnchor="middle" className="font-mono">
          {nivel.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default TanqueEnchimentoSlim;