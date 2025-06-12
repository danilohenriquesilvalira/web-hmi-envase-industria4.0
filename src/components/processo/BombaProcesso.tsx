import React from 'react';

interface BombaProcessoProps {
  // Status da bomba: 0=INATIVA, 1=ATIVA, 2=MANUTENÇÃO, 3=ALARME
  status?: number;
  rpm?: number; // RPM
  
  // Customização visual
  largura?: number;
  altura?: number;
  
  // Tags dos instrumentos
  tagBomba?: string; // P-101, P-102, etc.
  
  // Callbacks
  onBombaClick?: (tag: string) => void;
}

const BombaProcesso: React.FC<BombaProcessoProps> = ({
  status = 0,
  rpm = 0,
  largura = 89,
  altura = 81,
  tagBomba = 'P-101',
  onBombaClick = () => {}
}) => {
  
  // Cores ISA 104 baseadas no status
  const getCorBomba = () => {
    switch (status) {
      case 1: return '#7886A0'; // ATIVA - Azul
      case 2: return '#FFA500'; // MANUTENÇÃO - Laranja  
      case 3: return '#FF0000'; // ALARME - Vermelho
      default: return '#C0C0C0'; // INATIVA - Cinza
    }
  };

  const getCorStroke = () => {
    switch (status) {
      case 1: return '#4F4F50'; // ATIVA - Cinza escuro
      case 2: return '#FFA500'; // MANUTENÇÃO - Laranja
      case 3: return '#FF0000'; // ALARME - Vermelho  
      default: return '#808080'; // INATIVA - Cinza
    }
  };

  const getCorTexto = () => {
    switch (status) {
      case 1: return '#000000'; // ATIVA - Preto
      case 2: return '#FFA500'; // MANUTENÇÃO - Laranja
      case 3: return '#FF0000'; // ALARME - Vermelho
      default: return '#808080'; // INATIVA - Cinza
    }
  };

  return (
    <div 
      className="bomba-processo-container" 
      style={{ 
        display: 'inline-block',
        position: 'relative',
        // Altura fixa para evitar mudança de posição
        height: '100px', // Altura fixa que comporta SVG + RPM
        width: largura
      }}
    >
      <svg 
        width={largura} 
        height={altura} 
        viewBox="0 0 89 81" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          background: 'transparent', 
          cursor: 'pointer',
          display: 'block' // Remove espaços inline
        }}
        onClick={() => onBombaClick(tagBomba)}
      >
        {/* TEXTO BOMBA */}
        <path 
          d="M45.2197 80V79.1455L45.9766 78.999V73.8965L45.2197 73.75V72.8906H45.9766H48.3789C49.2155 72.8906 49.8682 73.0534 50.3369 73.3789C50.8057 73.7044 51.04 74.1911 51.04 74.8389C51.04 75.1676 50.9521 75.4622 50.7764 75.7227C50.6038 75.9798 50.3516 76.1735 50.0195 76.3037C50.3027 76.3656 50.5387 76.4746 50.7275 76.6309C50.9196 76.7871 51.0628 76.9775 51.1572 77.2021C51.2516 77.4235 51.2988 77.666 51.2988 77.9297C51.2988 78.61 51.0742 79.126 50.625 79.4775C50.1758 79.8258 49.5394 80 48.7158 80H45.2197ZM47.4023 78.9062H48.7158C49.0934 78.9062 49.3815 78.8249 49.5801 78.6621C49.7786 78.4961 49.8779 78.252 49.8779 77.9297C49.8779 77.5814 49.7933 77.3161 49.624 77.1338C49.4548 76.9482 49.1878 76.8555 48.8232 76.8555H47.4023V78.9062ZM47.4023 75.8691H48.4277C48.8086 75.8691 49.1016 75.791 49.3066 75.6348C49.5117 75.4785 49.6143 75.2507 49.6143 74.9512C49.6143 74.6224 49.5101 74.3799 49.3018 74.2236C49.0967 74.0674 48.7891 73.9893 48.3789 73.9893H47.4023V75.8691ZM52.1484 77.5098V76.4111H54.9023V77.5098H52.1484ZM55.8105 80V79.1455L57.0117 78.999V74.1846H55.7959V73.3691L58.4326 72.8906V78.999L59.6338 79.1455V80H55.8105ZM62.8027 80.1025C62.0605 80.1025 61.473 79.86 61.04 79.375C60.6071 78.8867 60.3906 78.1722 60.3906 77.2314V75.6641C60.3906 74.7266 60.6055 74.0137 61.0352 73.5254C61.4681 73.0339 62.054 72.7881 62.793 72.7881C63.5286 72.7881 64.113 73.0339 64.5459 73.5254C64.9821 74.0137 65.2002 74.7266 65.2002 75.6641V77.2314C65.2002 78.1722 64.9837 78.8867 64.5508 79.375C64.1211 79.86 63.5384 80.1025 62.8027 80.1025ZM62.8027 79.0088C63.1217 79.0088 63.3643 78.8786 63.5303 78.6182C63.6963 78.3577 63.7793 77.9411 63.7793 77.3682V75.5176C63.7793 74.9512 63.6947 74.5378 63.5254 74.2773C63.3561 74.0169 63.112 73.8867 62.793 73.8867C62.4707 73.8867 62.2266 74.0169 62.0605 74.2773C61.8945 74.5378 61.8115 74.9512 61.8115 75.5176V77.3682C61.8115 77.9411 61.8945 78.3577 62.0605 78.6182C62.2298 78.8786 62.4772 79.0088 62.8027 79.0088ZM65.9473 80V79.1455L67.1484 78.999V74.1846H65.9326V73.3691L68.5693 72.8906V78.999L69.7705 79.1455V80H65.9473Z" 
          fill={getCorTexto()}
        />

        {/* CORPO DA BOMBA */}
        <path 
          d="M55.0653 67C36.8759 67 22.1306 52.2254 22.1306 34C22.1306 30.5666 22.6539 27.2556 23.6249 24.1429H1.00164L1 2.92863H43.9445C47.4184 1.68016 51.1626 1 55.0653 1C73.2546 1 88 15.7746 88 34C88 52.2254 73.2546 67 55.0653 67Z" 
          fill={getCorBomba()}
        />
        
        {/* CONTORNOS DA BOMBA */}
        <path 
          d="M43.9445 2.92863C47.4184 1.68016 51.1626 1 55.0653 1C73.2546 1 88 15.7746 88 34C88 52.2254 73.2546 67 55.0653 67C36.8759 67 22.1306 52.2254 22.1306 34C22.1306 30.5666 22.6539 27.2556 23.6249 24.1429M43.9445 2.92863H1L1.00164 24.1429H23.6249M43.9445 2.92863C34.2774 6.40274 26.7025 14.2775 23.6249 24.1429M55.0653 27.5714C51.5219 27.5714 48.6494 30.4496 48.6494 34C48.6494 37.5504 51.5219 40.4286 55.0653 40.4286C58.6087 40.4286 61.4811 37.5504 61.4811 34C61.4811 30.4496 58.6087 27.5714 55.0653 27.5714Z" 
          stroke={getCorStroke()}
        />
      </svg>

      {/* RPM LOGO ABAIXO DO NOME B-101 */}
      {status === 1 && rpm > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '100px', // Bem próximo do B-101
          left: '50%',
          transform: 'translateX(-50%)', // Centraliza horizontalmente
          textAlign: 'center',
          fontSize: '12px', // Ligeiramente maior
          fontFamily: 'Arial, sans-serif',
          color: '#2c3e50',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}>
          {rpm} RPM
        </div>
      )}
    </div>
  );
};

export default BombaProcesso;