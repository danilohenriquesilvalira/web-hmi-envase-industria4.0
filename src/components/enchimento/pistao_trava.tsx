import React from 'react';

interface PistaoTravaProps {
  posicao: number; // 0 a 100 - 0 = embaixo/sumido, 100 = em cima
}

const PistaoTrava: React.FC<PistaoTravaProps> = ({ posicao }) => {
  // Calcula a posição Y do retângulo azul baseado na posição (0-100)
  // Quando posicao = 0: translateY = 37 (embaixo, quase sumindo)
  // Quando posicao = 100: translateY = 0 (posição original, em cima)
  const translateY = (100 - posicao) * 0.37;
  
  // Calcula a opacidade - quando posicao <= 10, começa a sumir
  const opacity = posicao <= 10 ? posicao / 10 : 1;

  return (
    <svg 
      width="38" 
      height="64" 
      viewBox="0 0 38 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Retângulo azul (pistão) com animação */}
      <rect 
        x="13" 
        y="0"
        width="12" 
        height="27" 
        fill="#0004FF"
        opacity={opacity}
        transform={`translateY(${translateY}px)`}
        style={{
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
          transformOrigin: 'center'
        }}
      />
      
      {/* Base do pistão (estrutura fixa) */}
      <path 
        d="M36.8127 31C36.8127 27 34.5033 27 34.5033 27H18.9075H12H3.31184C3.31184 27 1.00852 27 1.00325 31C0.997981 35 0.999607 58 1.00244 60.5C1.00527 63 3.31184 62.8094 3.31184 62.8094H34.5033C34.5033 62.8094 36.8126 63 36.8127 60.5V31Z" 
        fill="#D4D4D4" 
        stroke="black" 
        strokeWidth="0.5"
      />
      
      {/* Círculo central */}
      <path 
        d="M28 45C28 49.9706 23.9706 54 19 54C14.0294 54 10 49.9706 10 45C10 40.0294 14.0294 36 19 36C23.9706 36 28 40.0294 28 45Z" 
        fill="#D4D4D4" 
        stroke="black" 
        strokeWidth="0.5"
      />
      
      {/* Parafusos nos cantos */}
      <circle cx="7.5" cy="56.5" r="1.5" fill="black" />
      <circle cx="30.5" cy="56.5" r="1.5" fill="black" />
      <circle cx="30.5" cy="32.5" r="1.5" fill="black" />
      <circle cx="7.5" cy="32.5" r="1.5" fill="black" />
    </svg>
  );
};

export default PistaoTrava;