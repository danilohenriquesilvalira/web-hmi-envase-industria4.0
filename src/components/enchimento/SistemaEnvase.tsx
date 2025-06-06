import React, { useState, useEffect, useRef } from 'react';
import GarrafaSlim from './Garrafa';
import TanqueEnchimentoSlim from './TanqueEnchimento';
import ArrolhadorSlim from './Arrolhador';
import PrensaSlim from './Prensa';
import TransporteSlim from './Transporte';

// Componentes
import Header from './Header';
import { Falha } from './AlertSystem';
import DraggableDialog from './DraggableDialog';
import DashboardCompact from './DashboardCompact';

// Define a interface para o estado de uma garrafa
interface GarrafaState {
  id: number;
  estado: 'vazia' | 'cheia' | 'comRolha';
  posicao: number;
}

const SistemaEnvase: React.FC = () => {
  // Estados do processo
  const [processoAtivo, setProcessoAtivo] = useState(false);
  const [processoEmRecuperacao, setProcessoEmRecuperacao] = useState(false);
  const [ciclosCompletos, setCiclosCompletos] = useState(0);
  const [contadorGarrafas, setContadorGarrafas] = useState(0);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("2025-06-06 15:22:31");

  // Estados dos equipamentos
  const [transporte, setTransporte] = useState({ ativo: false, rotacao: 0 });
  const [tanque, setTanque] = useState({ nivel: 85, pistaoAvancado: false });
  const [arrolhador, setArrolhador] = useState({ ativo: false, tampa1Visivel: true, contador: 0 });
  const [prensa, setPrensa] = useState({ ativo: false, pistaoDescido: false, contador: 0 });

  // Estado para falhas
  const [falhas, setFalhas] = useState<Falha[]>([]);

  // Estado para gerenciar múltiplas garrafas
  const [garrafas, setGarrafas] = useState<GarrafaState[]>([]);
  const nextGarrafaId = useRef(0);

  // Quantidade de líquido consumida por garrafa (em %)
  const consumoPorGarrafa = 5;

  // Hook para detectar tamanho da tela
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 2552);
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1314);
  
  // Atualiza o relógio
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setCurrentDateTime(formatted);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🎯 CONFIGURAÇÕES PARA TELAS ESPECÍFICAS 🎯
  const getScreenConfig = () => {
    // MONITOR GRANDE: 2552x1314
    if (screenWidth >= 2500 && screenHeight >= 1300) {
      const escala = Math.min(1, screenWidth / 1800);
      return {
        name: "Monitor Grande 2552x1314",
        enchimento: { left: 600 * escala, bottom: -30 * escala, scale: 2.5 * escala },
        arrolhamento: { left: 1200 * escala, bottom: -10 * escala, scale: 2.6 * escala },
        prensa: { left: 1900 * escala, bottom: -10 * escala, scale: 2.8 * escala },
        transporte: { left: -2000 * escala, bottom: -520 * escala, scaleX: 2.5 * escala, scaleY: 3.8 * escala },
        garrafa: {
          ENTRADA: 166 * escala,
          ENCHIMENTO: 623 * escala,
          ARROLHAMENTO: 1410 * escala,
          PRENSA: 1900 * escala,
          SAIDA: 2000 * escala,
          bottom: -499 * escala,
          scale: 2.2 * escala
        },
        containerHeight: 600 * escala,
        topPadding: 120
      };
    }
    
    // NOTEBOOK: 1528x834
    if (screenWidth >= 1500 && screenWidth < 2500 && screenHeight >= 800) {
      return {
        name: "Notebook 1528x834",
        enchimento: { left: 360, bottom: 5, scale: 1.7 },
        arrolhamento: { left: 750, bottom: 22, scale: 1.7 },
        prensa: { left: 1200, bottom: 20, scale: 1.8 },
        transporte: { left: -530, bottom: -240, scaleX: 1.7, scaleY: 2.0 },
        garrafa: {
          ENTRADA: 80,
          ENCHIMENTO: 406,
          ARROLHAMENTO: 924,
          PRENSA: 1221,
          SAIDA: 1480,
          bottom: -235,
          scale: 1.2
        },
        containerHeight: 400,
        topPadding: 120
      };
    }
    
    // FALLBACK para outras resoluções
    return {
      name: "Outras Resoluções",
      enchimento: { left: 300, bottom: 120, scale: 0.8 },
      arrolhamento: { left: 450, bottom: 140, scale: 0.6 },
      prensa: { left: 600, bottom: 120, scale: 1.0 },
      transporte: { left: -150, bottom: 6, scaleX: 1.0, scaleY: 1.2 },
      garrafa: {
        ENTRADA: 150,
        ENCHIMENTO: 340,
        ARROLHAMENTO: 490,
        PRENSA: 640,
        SAIDA: 800,
        bottom: 6,
        scale: 0.7
      },
      containerHeight: 300,
      topPadding: 160
    };
  };

  const config = getScreenConfig();

  // 🎯 POSIÇÕES OTIMIZADAS PARA TELAS 🎯
  const pos = {
    enchimento: {
      left: config.enchimento.left,
      bottom: config.enchimento.bottom,
      scale: config.enchimento.scale,
      width: 140,
      height: 300
    },
    arrolhamento: {
      left: config.arrolhamento.left,
      bottom: config.arrolhamento.bottom,
      scale: config.arrolhamento.scale,
      width: 180,
      height: 140
    },
    prensa: {
      left: config.prensa.left,
      bottom: config.prensa.bottom,
      scale: config.prensa.scale,
      width: 100,
      height: 250
    },
    transporte: {
      left: config.transporte.left,
      bottom: config.transporte.bottom,
      scaleX: config.transporte.scaleX,
      scaleY: config.transporte.scaleY
    },
    garrafa: {
      ENTRADA: config.garrafa.ENTRADA,
      ENCHIMENTO: config.garrafa.ENCHIMENTO,
      ARROLHAMENTO: config.garrafa.ARROLHAMENTO,
      PRENSA: config.garrafa.PRENSA,
      SAIDA: config.garrafa.SAIDA,
      bottom: config.garrafa.bottom,
      scale: config.garrafa.scale
    }
  };

  // Sistema de verificação de falhas melhorado
  const verificarFalhas = () => {
    const novasFalhas: Falha[] = [];

    // FALHA CRÍTICA: Tanque Vazio
    if (tanque.nivel <= 0 && processoAtivo) {
      novasFalhas.push({
        codigo: 'F001',
        titulo: 'Tanque vazio - Processo parado',
        tipo: 'CRITICA',
        ativa: true
      });
    }

    // ALERTA: Nível Baixo
    if (tanque.nivel > 0 && tanque.nivel <= 15 && processoAtivo) {
      novasFalhas.push({
        codigo: 'F002',
        titulo: `Nível baixo: ${tanque.nivel}%`,
        tipo: 'ALERTA',
        ativa: true
      });
    }

    setFalhas(novasFalhas);

    const temFalhaCritica = novasFalhas.some(f => f.tipo === 'CRITICA');
    if (temFalhaCritica && processoAtivo && !processoEmRecuperacao) {
      pararProcessoPorFalha();
    }
  };

  // Hook para verificar falhas
  useEffect(() => {
    const interval = setInterval(verificarFalhas, 1000);
    return () => clearInterval(interval);
  }, [tanque.nivel, processoAtivo, processoEmRecuperacao, transporte.ativo, contadorGarrafas]);

  // Hook para monitor de recuperação do tanque
  useEffect(() => {
    // Se o processo está em recuperação e o tanque foi reabastecido
    if (processoEmRecuperacao && tanque.nivel > 20) {
      // Reativar o processo automaticamente
      setProcessoEmRecuperacao(false);
      reiniciarProcesso();
    }
  }, [tanque.nivel, processoEmRecuperacao]);

  // Animação das rodas do transporte
  useEffect(() => {
    if (!transporte.ativo) return;
    const interval = setInterval(() => {
      setTransporte(prev => ({ ...prev, rotacao: prev.rotacao + 2 }));
    }, 16);
    return () => clearInterval(interval);
  }, [transporte.ativo]);

  // Função para reabastecer o tanque
  const reabastecerTanque = () => {
    setTanque(prev => ({ ...prev, nivel: 85 }));
  };

  // Função para reconhecer falhas 
  const reconhecerFalhas = () => {
    // Manter as falhas, mas sinalizar que foram reconhecidas
  };

  // Função auxiliar para mover uma garrafa específica
  const moverGarrafa = (id: number, novaPosicao: number) => {
    setGarrafas(prevGarrafas =>
      prevGarrafas.map(g =>
        g.id === id ? { ...g, posicao: novaPosicao } : g
      )
    );
  };

  // Função auxiliar para atualizar o estado de uma garrafa específica
  const atualizarEstadoGarrafa = (id: number, novoEstado: 'vazia' | 'cheia' | 'comRolha') => {
    setGarrafas(prevGarrafas =>
      prevGarrafas.map(g =>
        g.id === id ? { ...g, estado: novoEstado } : g
      )
    );
  };

  // Adiciona uma nova garrafa à linha
  const adicionarNovaGarrafa = () => {
    const newGarrafa: GarrafaState = {
      id: nextGarrafaId.current++,
      estado: 'vazia',
      posicao: pos.garrafa.ENTRADA,
    };
    setGarrafas(prev => [...prev, newGarrafa]);
    return newGarrafa.id;
  };

  // Ref para controlar se há um ciclo de envase em andamento
  const isProcessingRef = useRef(false);

  const pararProcessoPorFalha = () => {
    setProcessoAtivo(false);
    isProcessingRef.current = false;
    setProcessoEmRecuperacao(true);  // Indica que o processo está esperando recuperação
    pararTodosEquipamentos();
  };

  const reiniciarProcesso = () => {
    if (!processoEmRecuperacao) return;
    
    setProcessoAtivo(true);
    isProcessingRef.current = true;
    setTransporte(prev => ({ ...prev, ativo: true }));
    sequenciaEnvase();
  };

  const executarProcesso = async () => {
    if (processoAtivo) {
      setProcessoAtivo(false);
      isProcessingRef.current = false;
      pararTodosEquipamentos();
      return;
    }

    // Verificar se há falhas críticas antes de iniciar
    if (tanque.nivel <= 0) {
      return;
    }

    setProcessoAtivo(true);
    isProcessingRef.current = true;
    setProcessoEmRecuperacao(false);
    setTransporte(prev => ({ ...prev, ativo: true }));
    await sleep(1000);

    sequenciaEnvase();
  };

  const sequenciaEnvase = async () => {
    if (!isProcessingRef.current) return;

    // VERIFICAÇÃO CRÍTICA: Tanque vazio
    if (tanque.nivel <= 0) {
      pararProcessoPorFalha();
      return;
    }

    if (tanque.nivel < consumoPorGarrafa) {
      setProcessoAtivo(false);
      isProcessingRef.current = false;
      return;
    }

    const idGarrafaAtual = adicionarNovaGarrafa();
    await sleep(500);

    moverGarrafa(idGarrafaAtual, pos.garrafa.ENCHIMENTO);
    await sleep(2000);

    setArrolhador(prev => ({ ...prev, ativo: true }));
    setPrensa(prev => ({ ...prev, ativo: true }));

    setTanque(prev => ({ ...prev, pistaoAvancado: true }));
    await sleep(800);

    await sleep(1500);
    
    setTanque(prev => ({ 
      ...prev, 
      nivel: Math.max(0, prev.nivel - consumoPorGarrafa)
    }));
    
    atualizarEstadoGarrafa(idGarrafaAtual, 'cheia');
    setContadorGarrafas(prev => prev + 1);

    setTanque(prev => ({ ...prev, pistaoAvancado: false }));
    await sleep(800);

    if (isProcessingRef.current) {
      setTimeout(() => {
        if (isProcessingRef.current) {
            sequenciaEnvase();
        }
      }, 500);
    }

    moverGarrafa(idGarrafaAtual, pos.garrafa.ARROLHAMENTO);
    await sleep(2000);

    setArrolhador(prev => ({ ...prev, tampa1Visivel: false }));
    await sleep(1000);
    atualizarEstadoGarrafa(idGarrafaAtual, 'comRolha');
    setArrolhador(prev => ({
      ...prev,
      tampa1Visivel: true,
      contador: prev.contador + 1
    }));
    await sleep(500);

    moverGarrafa(idGarrafaAtual, pos.garrafa.PRENSA);
    await sleep(2000);

    setPrensa(prev => ({ ...prev, pistaoDescido: true }));
    await sleep(1500);
    setPrensa(prev => ({
      ...prev,
      pistaoDescido: false,
      contador: prev.contador + 1
    }));
    await sleep(500);

    moverGarrafa(idGarrafaAtual, pos.garrafa.SAIDA);
    setCiclosCompletos(prev => prev + 1);

    setTimeout(() => {
      setGarrafas(prevGarrafas => prevGarrafas.filter(g => g.id !== idGarrafaAtual));
    }, 2000);

    if (!isProcessingRef.current) {
        pararTodosEquipamentos();
    }
  };

  const pararTodosEquipamentos = () => {
    setTransporte({ ativo: false, rotacao: 0 });
    setTanque(prev => ({ ...prev, pistaoAvancado: false }));
    setArrolhador(prev => ({ ...prev, ativo: false }));
    setPrensa(prev => ({ ...prev, ativo: false, pistaoDescido: false }));
    setGarrafas([]);
    nextGarrafaId.current = 0;
  };

  const resetarSistema = () => {
    setProcessoAtivo(false);
    setProcessoEmRecuperacao(false);
    isProcessingRef.current = false;
    setCiclosCompletos(0);
    setContadorGarrafas(0);
    pararTodosEquipamentos();
    setArrolhador(prev => ({ ...prev, contador: 0, tampa1Visivel: true }));
    setPrensa(prev => ({ ...prev, contador: 0 }));
    setTanque({ nivel: 85, pistaoAvancado: false });
    setFalhas([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="sistema-container" style={{ 
      minHeight: '100vh', 
      background: '#f3f4f6',
      overflow: 'hidden',
      width: '100vw'
    }}>
      {/* Header Component */}
      <Header 
        processoAtivo={processoAtivo}
        processoEmRecuperacao={processoEmRecuperacao}
        ciclosCompletos={ciclosCompletos}
        contadorGarrafas={contadorGarrafas}
        nivelTanque={tanque.nivel}
        falhas={falhas}
        onIniciarParar={executarProcesso}
        onResetSistema={resetarSistema}
        onReconhecerFalhas={reconhecerFalhas}
        onReabastecerTanque={reabastecerTanque}
        tanqueBaixo={tanque.nivel < 30}
      />

      {/* Dashboard Dialog Button */}
      <button
        onClick={() => setDialogAberto(true)}
        style={{
          position: 'fixed',
          top: '86px',
          right: '24px',
          zIndex: 999,
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
        </svg>
      </button>

      {/* Draggable Dashboard Dialog */}
      <DraggableDialog
        isOpen={dialogAberto}
        onClose={() => setDialogAberto(false)}
        title="Dashboard do Sistema de Envase"
        width={680}
        height={400}
      >
        <DashboardCompact
          nivelTanque={tanque.nivel}
          ciclosCompletos={ciclosCompletos}
          contadorGarrafas={contadorGarrafas}
          estaProcessando={processoAtivo}
          currentTime={currentDateTime}
          userName="Danilo Lira"
        />
      </DraggableDialog>

      {/* Área da Simulação */}
      <div style={{
        paddingTop: `${config.topPadding}px`,
        minHeight: '100vh'
      }}>

        {/* Simulação Otimizada */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: `${config.containerHeight}px`
        }}>

          {/* Enchimento */}
          <div style={{
            position: 'absolute',
            left: `${pos.enchimento.left}px`,
            bottom: `${pos.enchimento.bottom}px`,
            transform: `scale(${pos.enchimento.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <div style={{ width: `${pos.enchimento.width}px`, height: `${pos.enchimento.height}px` }}>
              <TanqueEnchimentoSlim
                nivel={tanque.nivel}
                pistaoAvancado={tanque.pistaoAvancado}
              />
            </div>
          </div>

          {/* Arrolhamento */}
          <div style={{
            position: 'absolute',
            left: `${pos.arrolhamento.left}px`,
            bottom: `${pos.arrolhamento.bottom}px`,
            transform: `scale(${pos.arrolhamento.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <div style={{ width: `${pos.arrolhamento.width}px`, height: `${pos.arrolhamento.height}px` }}>
              <ArrolhadorSlim
                ativo={arrolhador.ativo}
                tampa1Visivel={arrolhador.tampa1Visivel}
                contadorTampas={arrolhador.contador}
              />
            </div>
          </div>

          {/* Prensa */}
          <div style={{
            position: 'absolute',
            left: `${pos.prensa.left}px`,
            bottom: `${pos.prensa.bottom}px`,
            transform: `scale(${pos.prensa.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <div style={{ width: `${pos.prensa.width}px`, height: `${pos.prensa.height}px` }}>
              <PrensaSlim
                ativo={prensa.ativo}
                pistaoDescido={prensa.pistaoDescido}
                contadorPrensadas={prensa.contador}
              />
            </div>
          </div>

          {/* Renderiza MÚLTIPLAS Garrafas */}
          {garrafas.map((garrafaItem) => (
            <div
              key={garrafaItem.id}
              style={{
                position: 'absolute',
                left: `${garrafaItem.posicao}px`,
                bottom: `${pos.garrafa.bottom}px`,
                transform: `scale(${pos.garrafa.scale})`,
                transformOrigin: 'bottom center',
                transition: 'left 2s ease-in-out'
              }}
            >
              <GarrafaSlim
                estado={garrafaItem.estado}
                posicaoX={0}
                animacao={true}
              />
            </div>
          ))}

          {/* Transporte */}
          <div style={{
            position: 'absolute',
            bottom: `${pos.transporte.bottom}px`,
            left: `${pos.transporte.left}px`,
            width: '100%',
            transform: `scaleX(${pos.transporte.scaleX}) scaleY(${pos.transporte.scaleY})`,
            transformOrigin: 'bottom left'
          }}>
            <TransporteSlim ativo={transporte.ativo} rotacaoRodas={transporte.rotacao} />
          </div>

        </div>
      </div>

      <style>
        {`
          @keyframes sinoAlerta {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(8deg); }
          }
          
          /* REMOVE BARRAS DE ROLAGEM */
          * {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          
          *::-webkit-scrollbar {
            display: none !important;
          }
          
          body {
            overflow-x: hidden !important;
          }
          
          /* Animações suaves */
          .sistema-container * {
            transition: transform 0.3s ease, left 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default SistemaEnvase;