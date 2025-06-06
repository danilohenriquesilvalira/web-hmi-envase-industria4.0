import React from 'react';

interface TransporteSlimProps {
  ativo: boolean;
  rotacaoRodas: number;
}

const TransporteSlim: React.FC<TransporteSlimProps> = ({
  ativo,
  rotacaoRodas
}) => {
  return (
    <svg 
      width="100%" 
      height="150" 
      viewBox="0 0 1336 234" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <path 
        d="M113 104.999C113 90 121.638 90 121.638 90H1326.2C1326.2 90 1335 90 1335 105.276C1335 120.552 1326.52 119.997 1326.52 119.997H121.638C121.638 119.997 113 119.998 113 104.999Z" 
        stroke="black"
        fill={ativo ? "#E5E7EB" : "#F3F4F6"}
        className="transition-colors duration-300"
      />

      {[127.975, 425.975, 723.975, 1021.97, 1319.97].map((cx, index) => (
        <g key={index} transform={`rotate(${ativo ? rotacaoRodas : 0} ${cx} 105)`}>
          <circle cx={cx} cy="105" r="15" fill="#D9D9D9" stroke="black"/>
          <circle cx={cx + 3} cy="97.5" r="2" fill="#B1B1B1"/>
          <circle cx={cx - 7} cy="105" r="2" fill="#B1B1B1"/>
          <circle cx={cx} cy="113" r="2" fill="#B1B1B1"/>
          <circle cx={cx + 7} cy="105" r="2" fill="#B1B1B1"/>
        </g>
      ))}

      {[138, 368, 598, 828, 1058, 1288].map((x, index) => (
        <rect key={index} x={x} y="121" width="23" height="113" fill="#D9D9D9"/>
      ))}

      <path 
        d="M43.5157 7.34948H4.5C4.5 7.34948 1.01567 7.48351 1 3.48351C0.984329 -0.51649 4.5 0.0244118 4.5 0.0244118L110.516 0.023551C110.516 0.023551 114.516 0.0235515 114.516 4.02355C114.516 8.02355 110.649 7.52539 110.649 7.52539L70 7.34948V89.0216H110.5C110.5 89.0216 113.5 89.0216 113.5 94.2177C113.5 99.4139 110.5 99.4139 110.5 99.4139H70V232.022H43.5157V99.4139H3C3 99.4139 0 99.4139 0 94.2177C0 89.0216 3 89.0216 3 89.0216H43.5157V7.34948Z" 
        fill="#646464"
      />
    </svg>
  );
};

export default TransporteSlim;