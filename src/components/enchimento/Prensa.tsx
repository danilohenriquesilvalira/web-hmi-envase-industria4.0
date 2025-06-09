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
        width="105" 
        height="352" 
        viewBox="0 0 105 352" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Base part of the press */}
        <path 
          d="M99.5 160.5C99.5 160.5 79.975 208.004 79.3315 240.26C78.5836 277.747 104 333 104 333V351H1V333C1 333 26.4164 277.747 25.6685 240.26C25.025 208.004 5 160.5 5 160.5H99.5Z" 
          fill="#D8D8D8"
        />
        <path 
          d="M104 333C104 333 78.5836 277.747 79.3315 240.26C79.975 208.004 99.5 160.5 99.5 160.5H5C5 160.5 25.025 208.004 25.6685 240.26C26.4164 277.747 1 333 1 333M104 333H1M104 333V351H1V333" 
          stroke="black" 
          strokeWidth="0.1"
        />
        
        {/* Top part of the press */}
        <path 
          d="M31 61.5V1H75.5V61.5C75.5 65.5 78.5 65.5 78.5 65.5H99.5V140V160.5H85H5V152V140V65.5H27C27 65.5 31 65.5 31 61.5Z" 
          fill="#D8D8D8" 
          stroke="black" 
          strokeWidth="0.1"
        />
        
        {/* Piston assembly group - this will move */}
        <g className="transition-all duration-500" transform={`translate(0, ${pistaoOffset})`}>
          <path 
            d="M49.0006 60V56H56.6244V60L58 67V122H61V127H65.5V122.5H71.5V190H76.5V197.5H65.5V206.5H40V197.5H28V190H33.5V131.5V122.5H40V127H44V122H47.125V67L49.0006 60Z" 
            fill="#D9D9D9"
          />
          <path 
            d="M47.125 67L49.0006 60V56H56.6244V60L58 67M47.125 67H58M47.125 67V122M58 67V122M47.125 122H44V127M47.125 122H58M44 127H61M44 127H40V122.5H33.5V131.5V190H28V197.5H40V206.5H65.5V197.5H76.5V190H71.5V122.5H65.5V127H61M61 127V122H58" 
            stroke="black" 
            strokeWidth="0.5"
          />
          <path 
            d="M50.2859 127V132.359H48.5717V140.821V158.308H49.4288V161.974H46.0002C46.0002 161.974 43.8815 168.183 46.0002 171C48.8171 174.745 55.1833 174.745 58.0002 171C60.1189 168.183 58.0002 161.974 58.0002 161.974H54.8574V158.308H55.7145V132.359H54.0002V127.001" 
            stroke="black" 
            strokeWidth="0.5"
          />
          <path 
            d="M46.0408 199.7V195H59.5102V199.7L56.5821 201.207V206.722H64V214H42V206.722H48.9689V201.207L46.0408 199.7Z" 
            fill="#D9D9D9"
          />
          <path 
            d="M48.9689 206.722V201.207L46.0408 199.7V195H59.5102V199.7L56.5821 201.207V206.722M48.9689 206.722H56.5821M48.9689 206.722H42V214H64V206.722H56.5821" 
            stroke="black" 
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default PrensaSlim;