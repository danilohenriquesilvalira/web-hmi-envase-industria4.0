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
      viewBox="0 0 1333 234" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <defs>
        {/* Padrão para o efeito de movimento do tapete */}
        <pattern id="movingPattern" patternUnits="userSpaceOnUse" width="40" height="4">
          <rect width="40" height="4" fill="transparent"/>
          <rect width="20" height="2" fill="#999999" opacity="0.5">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 40,0; 0,0"
              dur={ativo ? "2s" : "0s"}
              repeatCount="indefinite"
            />
          </rect>
        </pattern>
      </defs>

      {/* Linha horizontal principal */}
      <path 
        d="M394 100H149V105.5H394H624H853H1084H1314H1322V100H1314H1084H854H624H394Z" 
        fill={ativo ? "#7C7C7C" : "#CCCCCC"}
        className="transition-colors duration-300"
      />

      {/* Efeito de tapete em movimento */}
      {ativo && (
        <rect 
          x="149" 
          y="100" 
          width="1173" 
          height="5.5" 
          fill="url(#movingPattern)"
        />
      )}

      {/* Suportes verticais */}
      <path d="M158 214.693V121H173V214.693H167V228.322H172.25V234H158V228.322H163.625V214.693H158Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>
      <path d="M418 214.693V121H433V214.693H427V228.322H432.25V234H418V228.322H423.625V214.693H418Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>
      <path d="M646 214.693V121H661V214.693H655V228.322H660.25V234H646V228.322H651.625V214.693H646Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>
      <path d="M874 214.693V121H889V214.693H883V228.322H888.25V234H874V228.322H879.625V214.693H874Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>
      <path d="M1102 214.693V121H1117V214.693H1111V228.322H1116.25V234H1102V228.322H1107.62V214.693H1102Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>
      <path d="M1274 214.693V121H1289V214.693H1283V228.322H1288.25V234H1274V228.322H1279.62V214.693H1274Z" fill={ativo ? "#D9D9D9" : "#E5E7EB"} className="transition-colors duration-300"/>

      {/* Trilho guia (linha com círculos) */}
      <path 
        d="M150.5 84.5C150.5 84.5 143.5 84.5 129.5 84.5C115.5 84.5 115.5 100 115.5 100C115.5 120.134 129.5 120.134 129.5 120.134C129.5 120.134 142 120 150.5 120M197.5 84.5H234.5M153.5 84.5H181.5M238.5 84.5H277.5M281.5 84.5H319.5M323.5 84.5H361.5M365.5 84.5H403.5M408.5 84.5H446.5M450.5 84.5H488.5M494.5 84.5H530.5M535.5 84.5H573.5M578.5 84.5H614.5M620.5 84.5H656.5M662.5 84.5H698.5M705.5 84.5H734.5M748.5 84H784.5M790.5 84H826.5M832.5 84H868.5M874.5 84H908.5M916.5 84H953.5M958.5 84H996.5M1002.5 84H1038.5M1043.5 84H1080.5M1086.5 84H1122.5M1128.5 84H1165.5M1170.5 84H1207.5M1212.5 84H1250.5M1255.5 84H1292.5M1297.5 84H1319.5C1319.5 84 1332 84 1332 96.5V99M1332 105C1332 105 1332 119 1318 119H1296.5M1292.5 119H1255.5M1250.5 119H1212.5M1207.5 119H1170.5M1165.5 119H1128.5M1122.5 119H1085.5M1080.5 119H1043.5M1038.5 119H1002.5M995.5 119H958.5M953.5 119H916.5M911.5 119H874.5M868.5 119H832.5M826.5 119.5H790.5M784.5 119.5H747.5M742.5 119.5H705.5M699.5 119.5H662.5M656.5 119.5H620.5M614.5 120H578.5M572.5 120H535.5M530.5 120H494.5M488.5 120H450.5M444.5 120H408.5M403.5 120H366.5M361.5 120H324.5M318.5 120H281.5M276 120H239.5M234.5 120H197.5M192.5 120H154.5" 
        stroke={ativo ? "black" : "#666666"}
        strokeWidth="1"
        className="transition-colors duration-300"
      />

      {/* Rodas individuais com coordenadas EXATAS do SVG */}
      {/* Roda 1 - posição 134 */}
      <g transform={`translate(134, 102)`}>
        <g transform={ativo ? `rotate(${rotacaoRodas})` : ''}>
          <circle cx="0" cy="0" r="15" fill="#D9D9D9" stroke="black" strokeWidth="0.5"/>
          <circle cx="-7.581" cy="-0.466" r="1.336" fill="black"/>
          <circle cx="-0.234" cy="-6.581" r="1.336" fill="black"/>
          <circle cx="7.941" cy="-0.466" r="1.336" fill="black"/>
          <circle cx="5.506" cy="8.035" r="1.336" fill="black"/>
          <circle cx="-5.152" cy="8.035" r="1.336" fill="black"/>
        </g>
      </g>

      {/* Roda 2 - posição 609 */}
      <g transform={`translate(609, 102)`}>
        <g transform={ativo ? `rotate(${rotacaoRodas})` : ''}>
          <circle cx="0" cy="0" r="15" fill="#D9D9D9" stroke="black" strokeWidth="0.5"/>
          <circle cx="-7.581" cy="-1.466" r="1.336" fill="black"/>
          <circle cx="-0.234" cy="-7.581" r="1.336" fill="black"/>
          <circle cx="7.941" cy="-1.466" r="1.336" fill="black"/>
          <circle cx="5.506" cy="7.035" r="1.336" fill="black"/>
          <circle cx="-5.152" cy="7.035" r="1.336" fill="black"/>
        </g>
      </g>

      {/* Roda 3 - posição 1314 */}
      <g transform={`translate(1314, 102)`}>
        <g transform={ativo ? `rotate(${rotacaoRodas})` : ''}>
          <circle cx="0" cy="0" r="15" fill="#D9D9D9" stroke="black" strokeWidth="0.5"/>
          <circle cx="-7.58" cy="-1.466" r="1.336" fill="black"/>
          <circle cx="-0.23" cy="-7.581" r="1.336" fill="black"/>
          <circle cx="7.94" cy="-1.466" r="1.336" fill="black"/>
          <circle cx="5.51" cy="7.035" r="1.336" fill="black"/>
          <circle cx="-5.15" cy="7.035" r="1.336" fill="black"/>
        </g>
      </g>

      {/* Letra T */}
      <path 
        d="M43.5157 7.34948H4.5C4.5 7.34948 1.01567 7.48351 1 3.48351C0.984329 -0.51649 4.5 0.0244118 4.5 0.0244118L110.516 0.023551C110.516 0.023551 114.516 0.0235515 114.516 4.02355C114.516 8.02355 110.649 7.52539 110.649 7.52539L70 7.34948V89.0216H110.5C110.5 89.0216 113.5 89.0216 113.5 94.2177C113.5 99.4139 110.5 99.4139 110.5 99.4139H70V232.022H43.5157V99.4139H3C3 99.4139 0 99.4139 0 94.2177C0 89.0216 3 89.0216 3 89.0216H43.5157V7.34948Z" 
        fill="#646464"
      />
    </svg>
  );
};

export default TransporteSlim;