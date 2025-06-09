import React, { useState, useEffect } from 'react';
import TanqueProcesso from './TanqueProcesso';
import BombaProcesso from './BombaProcesso';
import ValvulaOnOff from './ValvulaOnOff';
import FcvModuladora from './FcvModuladora';

const ProcessoFluxograma: React.FC = () => {
  // Hook para detectar tamanho da tela - IGUAL AO SISTEMA ENVASE
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 2552);
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1314);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🎯 CONFIGURAÇÕES PARA TELAS ESPECÍFICAS - MESMO PADRÃO DO SISTEMA ENVASE 🎯
  const getScreenConfig = () => {
    // MONITOR GRANDE: 2552x1314
    if (screenWidth >= 2500 && screenHeight >= 1300) {
      const escala = Math.min(1, screenWidth / 1800);
      return {
        name: "Monitor Grande 2552x1314",
        tanque: {
          left: 800 * escala,
          bottom: 100 * escala,
          scale: 1.0 * escala,
          largura: 313 * escala,
          altura: 416 * escala
        },
        bomba: {
          left: 1200 * escala,
          bottom: 250 * escala,
          scale: 1.5 * escala,
          largura: 89,
          altura: 68
        },
        valvula: {
          left: 1400 * escala,
          bottom: 280 * escala,
          scale: 2.0 * escala,
          largura: 36,
          altura: 37
        },
        fcv: {
          left: 1600 * escala,
          bottom: 260 * escala,
          scale: 2.0 * escala,
          largura: 45,
          altura: 42
        },
        containerHeight: 600 * escala,
        topPadding: 120
      };
    }
    
    // NOTEBOOK: 1528x834
    if (screenWidth >= 1500 && screenWidth < 2500 && screenHeight >= 800) {
      return {
        name: "Notebook 1528x834",
        tanque: {
          left: 400,
          bottom: 80,
          scale: 1.4,
          largura: 313,
          altura: 416
        },
        bomba: {
          left: 650,
          bottom: 200,
          scale: 1.8,
          largura: 89,
          altura: 68
        },
        valvula: {
          left: 820,
          bottom: 230,
          scale: 2.2,
          largura: 36,
          altura: 37
        },
        fcv: {
          left: 980,
          bottom: 210,
          scale: 2.2,
          largura: 45,
          altura: 42
        },
        containerHeight: 500,
        topPadding: 120
      };
    }
    
    // FALLBACK para outras resoluções
    return {
      name: "Outras Resoluções",
      tanque: {
        left: 250,
        bottom: 60,
        scale: 1.0,
        largura: 313,
        altura: 416
      },
      bomba: {
        left: 450,
        bottom: 150,
        scale: 1.5,
        largura: 89,
        altura: 68
      },
      valvula: {
        left: 580,
        bottom: 180,
        scale: 2.0,
        largura: 36,
        altura: 37
      },
      fcv: {
        left: 720,
        bottom: 160,
        scale: 2.0,
        largura: 45,
        altura: 42
      },
      containerHeight: 400,
      topPadding: 160
    };
  };

  const config = getScreenConfig();

  return (
    <div 
      className="fluxograma-container"
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        overflow: 'hidden',
        width: '100vw'
      }}
    >
      {/* Título */}
      <div style={{
        paddingTop: `${config.topPadding}px`,
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2c3e50',
          margin: '0 0 10px 0'
        }}>
          PROCESSO DE ENVASE - FLUXOGRAMA
        </h1>
      </div>

      {/* Área do Componente */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: `${config.containerHeight}px`
      }}>
        
        {/* TANQUE DE PRODUTO - Componente TanqueProcesso */}
        <div style={{
          position: 'absolute',
          left: `${config.tanque.left}px`,
          bottom: `${config.tanque.bottom}px`,
          transform: `scale(${config.tanque.scale})`,
          transformOrigin: 'bottom left'
        }}>
          <TanqueProcesso
            nivel={75}
            pressao={2.5}
            temperatura={20}
            tagTanque="T-101"
            ltAtivo={true}
            ptAtivo={true}
            lshAtivo={true}
            lslAtivo={true}
            corLiquido="#3498db"
            largura={config.tanque.largura}
            altura={config.tanque.altura}
            onInstrumentClick={(instrument) => console.log(`Clicou em: ${instrument}`)}
          />
        </div>

        {/* BOMBA DE PROCESSO - Componente BombaProcesso */}
        <div style={{
          position: 'absolute',
          left: `${config.bomba.left}px`,
          bottom: `${config.bomba.bottom}px`,
          transform: `scale(${config.bomba.scale})`,
          transformOrigin: 'bottom left'
        }}>
          <BombaProcesso
            ativo={true}
            pressao={2.8}
            fluxo={150}
            rotacao={1750}
            alarme={false}
            manutencao={false}
            corBomba="#7886A0"
            largura={config.bomba.largura}
            altura={config.bomba.altura}
            tagBomba="P-101"
            onBombaClick={(tag) => console.log(`Clicou na bomba: ${tag}`)}
            onStatusChange={(ativo) => console.log(`Status bomba: ${ativo ? 'ATIVO' : 'PARADO'}`)}
          />
        </div>

        {/* VÁLVULA ON/OFF - Componente ValvulaOnOff */}
        <div style={{
          position: 'absolute',
          left: `${config.valvula.left}px`,
          bottom: `${config.valvula.bottom}px`,
          transform: `scale(${config.valvula.scale})`,
          transformOrigin: 'bottom left'
        }}>
          <ValvulaOnOff
            aberta={true}
            pressaoEntrada={2.8}
            pressaoSaida={2.7}
            alarme={false}
            manutencao={false}
            falha={false}
            corValvula="#4A90E2"
            largura={config.valvula.largura}
            altura={config.valvula.altura}
            tagValvula="XV-101"
            onValvulaClick={(tag) => console.log(`Clicou na válvula: ${tag}`)}
            onStatusChange={(aberta) => console.log(`Status válvula: ${aberta ? 'ABERTA' : 'FECHADA'}`)}
          />
        </div>

        {/* FCV MODULADORA - Componente FcvModuladora */}
        <div style={{
          position: 'absolute',
          left: `${config.fcv.left}px`,
          bottom: `${config.fcv.bottom}px`,
          transform: `scale(${config.fcv.scale})`,
          transformOrigin: 'bottom left'
        }}>
          <FcvModuladora
            posicao={75}
            pressaoEntrada={2.7}
            pressaoSaida={2.5}
            fluxo={120}
            alarme={false}
            manutencao={false}
            corValvula="#00FF09"
            largura={config.fcv.largura}
            altura={config.fcv.altura}
            tagValvula="FCV-101"
            onValvulaClick={(tag) => console.log(`Clicou na FCV: ${tag}`)}
            onPosicaoChange={(posicao) => console.log(`Posição FCV: ${posicao}%`)}
          />
        </div>

      </div>
    </div>
  );
};

export default ProcessoFluxograma;