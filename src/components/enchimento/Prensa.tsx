import React from 'react';

interface PrensaSlimProps {
  ativo: boolean;
  pistaoDescido: boolean;
  contadorPrensadas: number;
}

const PrensaSlim: React.FC<PrensaSlimProps> = ({
  ativo,
  pistaoDescido,
  contadorPrensadas
}) => {
  const pistaoOffset = pistaoDescido ? 30 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-700 mb-2">PRENSA</div>
      <svg 
        width="80" 
        height="200" 
        viewBox="0 0 96 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path 
          d="M27 61.5V1H71.5V61.5C71.5 65.5 74.5 65.5 74.5 65.5H95.5V140V160.5H81H1V152V140V65.5H23C23 65.5 27 65.5 27 61.5Z" 
          stroke="black" 
          strokeWidth="0.5"
          fill="#D1D5DB"
        />

        <path 
          d="M43.5 160.498V169.998H40.5V184.998V215.998H42V222.498H36V238.498H57V222.498H51.5V215.998H53V169.998H50V160.499" 
          stroke="black" 
          strokeWidth="0.5"
          fill="#9CA3AF"
        />

        <g className="transition-all duration-500" transform={`translate(0, ${pistaoOffset})`}>
          <path 
            d="M41.125 100.5L43.0006 93.5V89.5H50.6244V93.5L52 100.5M41.125 100.5H52M41.125 100.5V155.5H38V160.5M52 100.5V155.5H55V160.5M38 160.5H55M38 160.5H34V156H27.5V165V223.5H22V231H34V240H59.5V231H70.5V223.5H65.5V156H59.5V160.5H55" 
            stroke="black" 
            strokeWidth="0.5"
            fill="#B8B8B8"
          />
        </g>

        {pistaoDescido && (
          <circle cx="46.5" cy={190 + pistaoOffset} r="3" fill="#EF4444" className="animate-ping"/>
        )}

        <text x="48" y="25" fontSize="12" fontWeight="bold" fill="#374151" textAnchor="middle" className="font-mono">
          {contadorPrensadas.toString().padStart(3, '0')}
        </text>
      </svg>
    </div>
  );
};

export default PrensaSlim;