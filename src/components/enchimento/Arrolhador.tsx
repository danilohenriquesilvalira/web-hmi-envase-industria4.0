import React from 'react';

interface ArrolhadorSlimProps {
  ativo: boolean;
  tampa1Visivel: boolean;
  contadorTampas: number;
}

const ArrolhadorSlim: React.FC<ArrolhadorSlimProps> = ({
  ativo,
  tampa1Visivel,
  contadorTampas
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-700 mb-2">ARROLHAMENTO</div>
      <svg 
        width="150" 
        height="120" 
        viewBox="0 0 209 169" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path 
          d="M151 1H136.5H135V60.5C135 98.5 173 98.5 173 98.5H178H208.5V90H196.5V82.5H173C173 82.5 151 82.5 151 60.5V1Z" 
          stroke="black" 
          strokeWidth="0.5"
          fill="#E5E7EB"
        />
        
        <path 
          d="M1 137.5V1H151.5V142.119L106 168.388H54.5L1 137.5Z" 
          stroke="black"
          fill="#D1D5DB"
        />
        
        <path 
          d="M80.4034 7.5V1H137.5H151.402V123.939L117.733 104.5L112.402 84.6075L97 93.5L55 51.5L80.4034 7.5Z" 
          stroke="black"
          fill="#F9FAFB"
        />
        
        {tampa1Visivel && (
          <path 
            d="M207 98V93C207 93 206.624 91.0003 202.8 91.0001C198.976 90.9999 193.649 91.0001 189.824 91.0001C186 91.0001 186 92.8351 186 92.8351V98L207 98Z" 
            fill="#3D1B1C" 
            stroke="black"
            className="transition-all duration-300"
          />
        )}
        
        <path 
          d="M184 98V93C184 93 183.624 91.0003 179.8 91.0001C175.976 90.9999 170.649 91.0001 166.824 91.0001C163 91.0001 163 92.8351 163 92.8351V98L184 98Z" 
          fill="#3D1B1C" 
          stroke="black"
        />

        <circle cx="20" cy="20" r="6" fill={ativo ? "#10B981" : "#EF4444"} className={ativo ? "animate-pulse" : ""}/>
        
        <rect x="170" y="10" width="25" height="12" fill="black" stroke="white"/>
        <text x="182.5" y="18" fontSize="8" fontWeight="bold" fill="#00FF00" textAnchor="middle">
          {contadorTampas.toString().padStart(2, '0')}
        </text>
      </svg>
    </div>
  );
};

export default ArrolhadorSlim;