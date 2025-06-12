import React, { useState, useEffect } from 'react';
import TanqueProcesso from './TanqueProcesso';
import BombaProcesso from './BombaProcesso';
import ValvulaOnOff from './ValvulaOnOff';
import FcvModuladora from './FcvModuladora';
import Pipeline from './Pipeline';



const ProcessoFluxograma: React.FC = () => {
  // Hook para detectar tamanho da tela - IGUAL AO SISTEMA ENVASE
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 2552);
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1314);

  // 🎯 ESTADOS DO PROCESSO 🎯
  const [processoLigado, setProcessoLigado] = useState(false);
  const [nivel, setNivel] = useState(75);
  const [statusBomba, setStatusBomba] = useState(0);
  const [rpmBomba, setRpmBomba] = useState(0);
  const [statusXV101, setStatusXV101] = useState(0);
  const [statusXV102, setStatusXV102] = useState(0);
  const [posicaoFCV, setPosicaoFCV] = useState(0);
  const [fluxo, setFluxo] = useState(0);
  const [pressaoEntrada, setPressaoEntrada] = useState(2.7);
  const [pressaoSaida, setPressaoSaida] = useState(2.5);

  // Estados das linhas do pipeline
  const [linhas, setLinhas] = useState({
    linha1: 0, linha2: 0, linha3: 0, linha4: 0,
    linha5: 0, linha6: 0, linha7: 0, linha8: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🎯 LÓGICA PRINCIPAL DO PROCESSO 🎯
  useEffect(() => {
    let interval: number;

    if (processoLigado) {
      interval = setInterval(() => {
        // 1. SEQUÊNCIA DE ABERTURA
        setStatusXV101(1); // Abre XV-101 primeiro
        
        setTimeout(() => {
          setStatusBomba(1); // Liga bomba
          setRpmBomba(1750);
        }, 1000);

        setTimeout(() => {
          // PID: Controla FCV baseado no nível
          setNivel(prev => {
            const novoNivel = Math.max(0, prev - 0.5); // Desce 0.5% por ciclo
            
            // PID simples: quanto menor o nível, mais fecha a FCV
            const posicaoPID = Math.min(100, Math.max(10, novoNivel * 1.2));
            setPosicaoFCV(posicaoPID);
            
            // Fluxo proporcional à posição da FCV
            const novoFluxo = (posicaoPID / 100) * 150;
            setFluxo(novoFluxo);
            
            return novoNivel;
          });
        }, 2000);

        setTimeout(() => {
          setStatusXV102(1); // Abre XV-102 para enchedora
        }, 3000);

        // Atualiza linhas do pipeline
        setLinhas({
          linha1: 1, linha2: 1, linha3: 1, linha4: 1,
          linha5: 1, linha6: 1, linha7: 1, linha8: 1
        });

      }, 2000); // Atualiza a cada 2 segundos
    } else {
      // PROCESSO DESLIGADO - PARA TUDO
      setStatusXV101(0);
      setStatusXV102(0);
      setStatusBomba(0);
      setRpmBomba(0);
      setPosicaoFCV(0);
      setFluxo(0);
      setLinhas({
        linha1: 0, linha2: 0, linha3: 0, linha4: 0,
        linha5: 0, linha6: 0, linha7: 0, linha8: 0
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [processoLigado]);

  // Reseta nível quando desliga
  useEffect(() => {
    if (!processoLigado) {
      setNivel(75); // Volta para 75%
    }
  }, [processoLigado]);

  // 🎯 CONFIGURAÇÕES PARA TELAS ESPECÍFICAS - MESMO PADRÃO DO SISTEMA ENVASE 🎯
  const getScreenConfig = () => {
    // MONITOR GRANDE: 2552x1314
    if (screenWidth >= 2500 && screenHeight >= 1300) {
      const escala = Math.min(1, screenWidth / 1800);
      return {
        name: "Monitor Grande 2552x1314",
        tanque: {
          left: 800 * escala,
          bottom: 150 * escala,
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
          scale: 1.0 * escala,
          largura: 36,
          altura: 37
        },
        valvula2: {
          left: 1500 * escala,
          bottom: 380 * escala,
          scale: 1.0 * escala,
          largura: 36,
          altura: 37
        },
        fcv: {
          left: 1600 * escala,
          bottom: 260 * escala,
          scale: 1.0 * escala,
          largura: 187,
          altura: 96
        },
        pipeline: {
          left: 200 * escala,
          bottom: 200 * escala,
          scale: 0.8 * escala,
          largura: 859,
          altura: 211
        },
        containerHeight: 800 * escala,
        topPadding: 50
      };
    }
    
    // NOTEBOOK: 1528x834
    if (screenWidth >= 1500 && screenWidth < 2500 && screenHeight >= 800) {
      return {
        name: "Notebook 1528x834",
        tanque: {
          left: 760,
          bottom: 320,
          scale: 1.0,
          largura: 313,
          altura: 416
        },
        bomba: {
          left: 752,
          bottom: 80,
          scale: 1.4,
          largura: 89,
          altura: 68
        },
        valvula: {
          left: 887,
          bottom: 270,
          scale: 1.4,
          largura: 36,
          altura: 37
        },
        valvula2: {
          left: 176,
          bottom: 182,
          scale: 1.4,
          largura: 36,
          altura: 37
        },
        fcv: {
          left: 531,
          bottom: 186,
          scale: 1.0,
          largura: 187,
          altura: 96
        },
        pipeline: {
          left: 51,
          bottom: 188,
          scale: 1.0,
          largura: 859,
          altura: 211
        },
        containerHeight: 700,
        topPadding: 50
      };
    }
    
    // FALLBACK para outras resoluções
    return {
      name: "Outras Resoluções",
      tanque: {
        left: 250,
        bottom: 100,
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
      valvula2: {
        left: 650,
        bottom: 250,
        scale: 2.0,
        largura: 36,
        altura: 37
      },
      fcv: {
        left: 720,
        bottom: 160,
        scale: 1.0,
        largura: 187,
        altura: 96
      },
      pipeline: {
        left: 100,
        bottom: 120,
        scale: 0.5,
        largura: 859,
        altura: 211
      },
      containerHeight: 600,
      topPadding: 50
    };
  };

  const config = getScreenConfig();

  return (
    <div 
      className="fluxograma-container"
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        overflow: 'visible',
        width: '100vw'
      }}
    >
      {/* 🎯 BOTÃO DE CONTROLE DO PROCESSO 🎯 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setProcessoLigado(!processoLigado)}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: processoLigado ? '#e74c3c' : '#27ae60',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          {processoLigado ? 'DESLIGAR PROCESSO' : 'LIGAR PROCESSO'}
        </button>
      </div>

      {/* STATUS DO PROCESSO */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 1000,
        background: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div><strong>Status:</strong> {processoLigado ? 'OPERANDO' : 'PARADO'}</div>
        <div><strong>Nível:</strong> {nivel.toFixed(1)}%</div>
        <div><strong>Fluxo:</strong> {fluxo.toFixed(0)} L/min</div>
        <div><strong>FCV:</strong> {posicaoFCV.toFixed(0)}%</div>
      </div>

      {/* Área do Componente */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: `${config.containerHeight}px`,
        height: 'auto',
        overflow: 'visible',
        paddingTop: `${config.topPadding}px`
      }}>
        
        {/* PIPELINE - Linhas de Processo */}
        <div style={{
          position: 'absolute',
          left: `${config.pipeline.left}px`,
          bottom: `${config.pipeline.bottom}px`,
          transform: `scale(${config.pipeline.scale})`,
          transformOrigin: 'bottom left',
          zIndex: 1
        }}>
          <Pipeline
            linha1={linhas.linha1}
            linha2={linhas.linha2}
            linha3={linhas.linha3}
            linha4={linhas.linha4}
            linha5={linhas.linha5}
            linha6={linhas.linha6}
            linha7={linhas.linha7}
            linha8={linhas.linha8}
            largura={config.pipeline.largura}
            altura={config.pipeline.altura}
            corAtivo="#00FF00"
            corInativo="#808080"
          />
        </div>
        
        {/* TANQUE DE PRODUTO - Componente TanqueProcesso */}
        <div style={{
          position: 'absolute',
          left: `${config.tanque.left}px`,
          bottom: `${config.tanque.bottom}px`,
          transform: `scale(${config.tanque.scale})`,
          transformOrigin: 'bottom left',
          zIndex: 2
        }}>
          <TanqueProcesso
            nivel={nivel}
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
          transformOrigin: 'bottom left',
          zIndex: 2
        }}>
          <BombaProcesso
            status={statusBomba}
            rpm={rpmBomba}
            largura={config.bomba.largura}
            altura={config.bomba.altura}
            tagBomba="P-101"
            onBombaClick={(tag) => console.log(`Clicou na bomba: ${tag}`)}
          />
        </div>

        {/* VÁLVULA ON/OFF XV-101 */}
        <div style={{
          position: 'absolute',
          left: `${config.valvula.left}px`,
          bottom: `${config.valvula.bottom}px`,
          transform: `scale(${config.valvula.scale})`,
          transformOrigin: 'bottom left',
          zIndex: 2
        }}>
          <ValvulaOnOff
            status={statusXV101}
            alarme={false}
            corValvula="#4A90E2"
            largura={config.valvula.largura}
            altura={config.valvula.altura}
            rotacao={90}
            tagValvula="XV-101"
            onValvulaClick={(tag) => console.log(`Clicou na válvula: ${tag}`)}
            onStatusChange={(status) => console.log(`Status válvula: ${status === 1 ? 'ATIVO' : status === 0 ? 'INATIVO' : status === 2 ? 'MANUTENÇÃO' : 'FALHA'}`)}
          />
        </div>

        {/* VÁLVULA ON/OFF XV-102 */}
        <div style={{
          position: 'absolute',
          left: `${config.valvula2.left}px`,
          bottom: `${config.valvula2.bottom}px`,
          transform: `scale(${config.valvula2.scale})`,
          transformOrigin: 'bottom left',
          zIndex: 2
        }}>
          <ValvulaOnOff
            status={statusXV102}
            alarme={false}
            corValvula="#4A90E2"
            largura={config.valvula2.largura}
            altura={config.valvula2.altura}
            rotacao={0}
            tagValvula="XV-102"
            onValvulaClick={(tag) => console.log(`Clicou na válvula: ${tag}`)}
            onStatusChange={(status) => console.log(`Status válvula: ${status === 1 ? 'ATIVO' : status === 0 ? 'INATIVO' : status === 2 ? 'MANUTENÇÃO' : 'FALHA'}`)}
          />
        </div>

        {/* FCV MODULADORA - Componente FcvModuladora */}
        <div style={{
          position: 'absolute',
          left: `${config.fcv.left}px`,
          bottom: `${config.fcv.bottom}px`,
          transform: `scale(${config.fcv.scale})`,
          transformOrigin: 'bottom left',
          zIndex: 2
        }}>
          <FcvModuladora
            posicao={posicaoFCV}
            pressaoEntrada={pressaoEntrada}
            pressaoSaida={pressaoSaida}
            fluxo={fluxo}
            alarme={false}
            manutencao={false}
            corValvula="#FFFFFF"
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