import React, { useState, useEffect, useRef } from 'react';
import GarrafaSlim from './Garrafa';
import TanqueEnchimentoSlim from './TanqueEnchimento';
import ArrolhadorSlim from './Arrolhador';
import PrensaSlim from './Prensa';
import TransporteSlim from './Transporte';
import PistaoTrava from './pistao_trava';

// Componentes
import Header from './Header';
import { Falha } from './AlertSystem';
import DraggableDialog from './DraggableDialog';
import DashboardCompact from './DashboardCompact';

// Define a interface para o estado de uma garrafa
interface GarrafaState {
  id: number;
  estado: 'vazia' | 'enchendo' | 'cheia' | 'comRolha';
  posicao: number;
  nivelEnchimento: number; // 0-100% para animação realista
}

const SistemaEnvase: React.FC = () => {
  // Estados do processo
  const [processoAtivo, setProcessoAtivo] = useState(false);
  const [processoEmRecuperacao, setProcessoEmRecuperacao] = useState(false);
  const [ciclosCompletos, setCiclosCompletos] = useState(0);
  const [contadorGarrafas, setContadorGarrafas] = useState(0);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("2025-06-06 16:41:26");
  
  // Estado para controle do sino piscante
  const [sinoVisivel, setSinoVisivel] = useState(true);
  
  // Flag para controlar se estamos em estado de falha persistente
  const [falhaPersistente, setFalhaPersistente] = useState(false);

  // Estados dos equipamentos
  const [transporte, setTransporte] = useState({ ativo: false, rotacao: 0 });
  const [tanque, setTanque] = useState({ nivel: 85, pistaoAvancado: false });
  const [arrolhador, setArrolhador] = useState({ ativo: false, tampa1Visivel: true, contador: 0 });
  const [prensa, setPrensa] = useState({ ativo: false, pistaoDescido: false, contador: 0 });

  // Estados dos pistões de trava (3 pistões)
  const [pistaoEnchimento, setPistaoEnchimento] = useState({ posicao: 0 });
  const [pistaoArrolhador, setPistaoArrolhador] = useState({ posicao: 0 });
  const [pistaoPrensa, setPistaoPrensa] = useState({ posicao: 0 });

  // Referência para o valor absoluto da rotação
  const rotacaoAbsolutaRef = useRef(0);

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
  
  // 🔧 CONTROLE DE FILA DE PROCESSAMENTO - SOLUÇÃO PRINCIPAL
  const filaProcessamento = useRef<number[]>([]);
  const processandoAtualmente = useRef<Set<number>>(new Set());

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

  // Efeito para fazer o sino piscar quando existem falhas críticas
  useEffect(() => {
    const temFalhaCritica = falhas.some(f => f.tipo === 'CRITICA');
    
    if (temFalhaCritica || falhaPersistente) {
      // Intervalo para alternar a visibilidade do sino (piscar)
      const interval = setInterval(() => {
        setSinoVisivel(prev => !prev);
      }, 500); // Pisca a cada 500ms
      
      return () => clearInterval(interval);
    } else {
      // Quando não há falhas críticas, mantém o sino sempre visível
      setSinoVisivel(true);
    }
  }, [falhas, falhaPersistente]);

  // 🎯 CONFIGURAÇÕES PARA TELAS ESPECÍFICAS 🎯
  const getScreenConfig = () => {
    // MONITOR GRANDE: 2552x1314
    if (screenWidth >= 2500 && screenHeight >= 1300) {
      const escala = Math.min(1, screenWidth / 1800);
      return {
        name: "Monitor Grande 2552x1314",
        enchimento: { left: 600 * escala, bottom: -30 * escala, scale: 2.5 * escala },
        arrolhamento: { left: 1200 * escala, bottom: -10 * escala, scale: 2.6 * escala },
        prensa: { left: 1900 * escala, bottom: 144 * escala, scale: 2.2 * escala },
        transporte: { left: -2000 * escala, bottom: -458 * escala, scaleX: 2.5 * escala, scaleY: 3.0 * escala },
        pistoes: {
          enchimento: { left: 710 * escala, bottom: -234 * escala, scale: 1.7 * escala },
          arrolhador: { left: 1496 * escala, bottom: -234 * escala, scale: 1.7 * escala },
          prensa: { left: 1987 * escala, bottom: -234 * escala, scale: 1.7 * escala }
        },
        garrafa: {
          ENTRADA: 166 * escala,
          ENCHIMENTO: 625 * escala,
          ARROLHAMENTO: 1410 * escala,
          PRENSA: 1900 * escala,
          SAIDA: 2200 * escala,
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
        transporte: { left: -530, bottom: -245, scaleX: 1.7, scaleY: 2.0 },
        pistoes: {
          enchimento: { left: 300, bottom: 180, scale: 1.2 },
          arrolhador: { left: 690, bottom: 180, scale: 1.2 },
          prensa: { left: 1140, bottom: 180, scale: 1.2 }
        },
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
      pistoes: {
        enchimento: { left: 260, bottom: 140, scale: 0.8 },
        arrolhador: { left: 410, bottom: 140, scale: 0.8 },
        prensa: { left: 560, bottom: 140, scale: 0.8 }
      },
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
    pistoes: {
      enchimento: config.pistoes.enchimento,
      arrolhador: config.pistoes.arrolhador,
      prensa: config.pistoes.prensa
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
    if (tanque.nivel <= 0) {
      novasFalhas.push({
        codigo: 'F001',
        titulo: 'Tanque vazio - Processo parado',
        tipo: 'CRITICA',
        ativa: true
      });
      
      // Marcar como falha persistente até que o tanque seja reabastecido
      setFalhaPersistente(true);
    } 
    // Se o tanque foi reabastecido, podemos remover o estado de falha persistente
    else if (tanque.nivel > 20 && falhaPersistente) {
      setFalhaPersistente(false);
    }

    // ALERTA: Nível Baixo
    if (tanque.nivel > 0 && tanque.nivel <= 15) {
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
  }, [tanque.nivel, processoAtivo, processoEmRecuperacao, transporte.ativo, contadorGarrafas, falhaPersistente]);

  // Hook para monitor de recuperação do tanque
  useEffect(() => {
    // Se o processo está em recuperação e o tanque foi reabastecido
    if (processoEmRecuperacao && tanque.nivel > 20) {
      // Reativar o processo automaticamente
      setProcessoEmRecuperacao(false);
      reiniciarProcesso();
    }
  }, [tanque.nivel, processoEmRecuperacao]);

  // Animação das rodas do transporte - CORREÇÃO
  useEffect(() => {
    if (!transporte.ativo) {
      // Reset da rotação quando parar
      rotacaoAbsolutaRef.current = 0;
      return;
    }
    
    const interval = setInterval(() => {
      // Incrementa o valor absoluto da rotação
      rotacaoAbsolutaRef.current += 2;
      
      // Atualiza o estado com o valor absoluto
      setTransporte(prev => ({ ...prev, rotacao: rotacaoAbsolutaRef.current }));
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

  // 🔧 FUNÇÃO ATUALIZADA - SEM CONFLITOS DE ESTADO
  const atualizarEstadoGarrafa = (id: number, novoEstado: 'vazia' | 'enchendo' | 'cheia' | 'comRolha', nivel?: number) => {
    setGarrafas(prevGarrafas => {
      const novasGarrafas = prevGarrafas.map(g => {
        if (g.id === id) {
          const garrafaAtualizada = { 
            ...g, 
            estado: novoEstado,
            nivelEnchimento: nivel !== undefined ? nivel : g.nivelEnchimento
          };
          console.log(`🔄 GARRAFA ${id}: ${novoEstado} - ${garrafaAtualizada.nivelEnchimento}%`);
          return garrafaAtualizada;
        }
        return g;
      });
      return novasGarrafas;
    });
  };

  // 🔧 CRIAÇÃO LIMPA DE GARRAFA - GARANTIA ABSOLUTA - CORRIGIDO
  const criarGarrafaLimpa = (): number => {
    const novoId = nextGarrafaId.current++;
    
    // Criar garrafa com estado explicitamente vazio
    const newGarrafa: GarrafaState = {
      id: novoId,
      estado: 'vazia',
      posicao: pos.garrafa.ENTRADA,
      nivelEnchimento: 0
    };
    
    console.log(`🆕 CRIANDO GARRAFA ${novoId} - ESTADO INICIAL LIMPO`);
    
    // Adicionar à fila de processamento
    filaProcessamento.current.push(novoId);
    
    // Adicionar de forma isolada para evitar interferências
    setGarrafas(prevGarrafas => {
      console.log(`📋 TOTAL DE GARRAFAS ANTES: ${prevGarrafas.length}`);
      const novoArray = [...prevGarrafas, newGarrafa];
      console.log(`📋 TOTAL DE GARRAFAS APÓS: ${novoArray.length}`);
      return novoArray;
    });
    
    return novoId;
  };

  // Ref para controlar se há um ciclo de envase em andamento
  const isProcessingRef = useRef(false);

  const pararProcessoPorFalha = () => {
    setProcessoAtivo(false);
    isProcessingRef.current = false;
    setProcessoEmRecuperacao(true);  // Indica que o processo está esperando recuperação
    
    // Limpar filas
    filaProcessamento.current = [];
    processandoAtualmente.current.clear();
    
    pararTodosEquipamentos();
  };

  const reiniciarProcesso = () => {
    if (!processoEmRecuperacao) return;
    
    setProcessoAtivo(true);
    isProcessingRef.current = true;
    setTransporte(prev => ({ ...prev, ativo: true }));
    
    // Reiniciar sistema de fila
    filaProcessamento.current = [];
    processandoAtualmente.current.clear();
    
    sequenciaEnvase();
  };

  const executarProcesso = async () => {
    if (processoAtivo) {
      setProcessoAtivo(false);
      isProcessingRef.current = false;
      
      // Limpar filas
      filaProcessamento.current = [];
      processandoAtualmente.current.clear();
      
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

  // 🚀 ANIMAÇÃO DE ENCHIMENTO ISOLADA E PROTEGIDA - CORRIGIDA
  const animarEnchimentoLimpo = async (idGarrafa: number) => {
    console.log(`🌊 INICIANDO ANIMAÇÃO LIMPA - GARRAFA ${idGarrafa}`);
    
    const duracaoTotal = 3000; // 3 segundos
    const passos = 30;
    const intervalo = duracaoTotal / passos;
    
    // Força uma renderização com estado vazio garantido antes de iniciar
    setGarrafas(prevGarrafas => {
      return prevGarrafas.map(g => 
        g.id === idGarrafa ? { ...g, estado: 'vazia', nivelEnchimento: 0 } : g
      );
    });
    
    // Esperar essa renderização completar
    await sleep(300);
    
    // Marcar como enchendo
    atualizarEstadoGarrafa(idGarrafa, 'enchendo', 0);
    await sleep(200);
    
    // Loop de animação protegido
    for (let i = 1; i <= passos; i++) {
      if (!isProcessingRef.current || !processandoAtualmente.current.has(idGarrafa)) {
        console.log(`⚠️ ANIMAÇÃO CANCELADA - GARRAFA ${idGarrafa}`);
        break;
      }
      
      const nivel = (i / passos) * 100;
      atualizarEstadoGarrafa(idGarrafa, 'enchendo', nivel);
      
      if (i % 8 === 0) {
        console.log(`📊 GARRAFA ${idGarrafa}: ${Math.round(nivel)}%`);
      }
      
      await sleep(intervalo);
    }
    
    // Finalizar como cheia
    atualizarEstadoGarrafa(idGarrafa, 'cheia', 100);
    console.log(`✅ GARRAFA ${idGarrafa} - ANIMAÇÃO COMPLETA`);
  };

  // 🔧 PROCESSO DE ENCHIMENTO COMPLETAMENTE REESTRUTURADO - CORRIGIDO
  const processoEnchimentoLimpo = async () => {
    if (!isProcessingRef.current) return;

    if (tanque.nivel <= 0) {
      pararProcessoPorFalha();
      return;
    }

    if (tanque.nivel < consumoPorGarrafa) {
      return;
    }

    // 1. CRIAR GARRAFA COM ESTADO GARANTIDAMENTE LIMPO
    const idGarrafaAtual = criarGarrafaLimpa();
    
    // Marcar como em processamento
    processandoAtualmente.current.add(idGarrafaAtual);
    
    console.log(`🔄 PROCESSANDO GARRAFA ${idGarrafaAtual}`);
    
    // 2. AGUARDAR CRIAÇÃO COMPLETA E RENDERIZAÇÃO
    await sleep(1000); // Aumentar o tempo de espera após criar a garrafa

    // 3. MOVER PARA ENCHIMENTO (garantindo estado vazio)
    moverGarrafa(idGarrafaAtual, pos.garrafa.ENCHIMENTO);
    
    // Confirmar explicitamente o estado vazio antes de continuar
    atualizarEstadoGarrafa(idGarrafaAtual, 'vazia', 0);
    await sleep(2000);

    // 4. CONFIGURAR EQUIPAMENTOS
    setPistaoEnchimento({ posicao: 100 });
    await sleep(500);

    setTanque(prev => ({ ...prev, pistaoAvancado: true }));
    await sleep(500);
    
    // 5. EXECUTAR ANIMAÇÃO LIMPA
    await animarEnchimentoLimpo(idGarrafaAtual);
    
    // 6. FINALIZAR EQUIPAMENTOS
    setTanque(prev => ({ 
      ...prev, 
      nivel: Math.max(0, prev.nivel - consumoPorGarrafa),
      pistaoAvancado: false
    }));
    
    setContadorGarrafas(prev => prev + 1);
    await sleep(500);

    setPistaoEnchimento({ posicao: 0 });
    await sleep(500);

    // 7. MOVER PARA PRÓXIMA ESTAÇÃO
    moverGarrafa(idGarrafaAtual, pos.garrafa.ARROLHAMENTO);
    
    // 8. AGENDAR PRÓXIMA GARRAFA COM CONTROLE DE FILA
    // Esperar um pouco mais antes de agendar a próxima garrafa
    if (isProcessingRef.current) {
      setTimeout(() => {
        if (isProcessingRef.current) {
          console.log(`⏰ AGENDANDO PRÓXIMA GARRAFA`);
          processoEnchimentoLimpo();
        }
      }, 8000); // Aumentar o intervalo entre garrafas
    }

    // 9. CONTINUAR COM ESTA GARRAFA
    await sleep(2000);
    await processoArrolhamento(idGarrafaAtual);
  };

  // 🔧 PROCESSO DE ARROLHAMENTO
  const processoArrolhamento = async (idGarrafa: number) => {
    if (!isProcessingRef.current || !processandoAtualmente.current.has(idGarrafa)) return;

    // Pistão de trava do arrolhador sobe
    setPistaoArrolhador({ posicao: 100 });
    await sleep(500);

    setArrolhador(prev => ({ ...prev, tampa1Visivel: false }));
    await sleep(1000);
    atualizarEstadoGarrafa(idGarrafa, 'comRolha', 100);
    setArrolhador(prev => ({
      ...prev,
      tampa1Visivel: true,
      contador: prev.contador + 1
    }));
    await sleep(500);

    // Pistão de trava desce
    setPistaoArrolhador({ posicao: 0 });
    await sleep(500);

    // Move para prensa
    moverGarrafa(idGarrafa, pos.garrafa.PRENSA);
    await sleep(2000);
    await processoPrensagem(idGarrafa);
  };

  // 🔧 PROCESSO DE PRENSAGEM
  const processoPrensagem = async (idGarrafa: number) => {
    if (!isProcessingRef.current || !processandoAtualmente.current.has(idGarrafa)) return;

    // Pistão de trava da prensa sobe
    setPistaoPrensa({ posicao: 100 });
    await sleep(500);

    setPrensa(prev => ({ ...prev, pistaoDescido: true }));
    await sleep(1500);
    setPrensa(prev => ({
      ...prev,
      pistaoDescido: false,
      contador: prev.contador + 1
    }));
    await sleep(500);

    // Pistão de trava desce
    setPistaoPrensa({ posicao: 0 });
    await sleep(500);

    // Move para saída
    moverGarrafa(idGarrafa, pos.garrafa.SAIDA);
    setCiclosCompletos(prev => prev + 1);

    // Remover do processamento
    processandoAtualmente.current.delete(idGarrafa);

    // Remove garrafa após sair
    setTimeout(() => {
      setGarrafas(prevGarrafas => prevGarrafas.filter(g => g.id !== idGarrafa));
      console.log(`🗑️ GARRAFA ${idGarrafa} REMOVIDA DO SISTEMA`);
    }, 2000);
  };

  const sequenciaEnvase = async () => {
    if (!isProcessingRef.current) return;

    // Ativa equipamentos auxiliares
    setArrolhador(prev => ({ ...prev, ativo: true }));
    setPrensa(prev => ({ ...prev, ativo: true }));

    // Limpar controles
    filaProcessamento.current = [];
    processandoAtualmente.current.clear();

    // Inicia o pipeline com primeira garrafa
    processoEnchimentoLimpo();
  };

  const pararTodosEquipamentos = () => {
    setTransporte({ ativo: false, rotacao: 0 });
    setTanque(prev => ({ ...prev, pistaoAvancado: false }));
    setArrolhador(prev => ({ ...prev, ativo: false }));
    setPrensa(prev => ({ ...prev, ativo: false, pistaoDescido: false }));
    // Resetar pistões de trava
    setPistaoEnchimento({ posicao: 0 });
    setPistaoArrolhador({ posicao: 0 });
    setPistaoPrensa({ posicao: 0 });
    setGarrafas([]);
    nextGarrafaId.current = 0;
    
    // Limpar filas
    filaProcessamento.current = [];
    processandoAtualmente.current.clear();
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
    // Resetar pistões de trava
    setPistaoEnchimento({ posicao: 0 });
    setPistaoArrolhador({ posicao: 0 });
    setPistaoPrensa({ posicao: 0 });
    setFalhas([]);
    setFalhaPersistente(false);
    
    // Limpar sistemas de controle
    filaProcessamento.current = [];
    processandoAtualmente.current.clear();
    nextGarrafaId.current = 0;
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
        sinoVisivel={sinoVisivel}
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
          userName="danilohenriquesilvaliraRADAR SICK"
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

          {/* 🚀 RENDERIZAÇÃO LIMPA DE GARRAFAS */}
          {garrafas.map((garrafaItem) => (
            <div
              key={`garrafa-${garrafaItem.id}`}
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
                nivelEnchimento={garrafaItem.nivelEnchimento}
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
            transformOrigin: 'bottom left',
            overflow: 'hidden'
          }}>
            <TransporteSlim ativo={transporte.ativo} rotacaoRodas={transporte.rotacao} />
          </div>

          {/* Pistões de Trava */}
          {/* Pistão Enchimento */}
          <div style={{
            position: 'absolute',
            left: `${pos.pistoes.enchimento.left}px`,
            bottom: `${pos.pistoes.enchimento.bottom}px`,
            transform: `scale(${pos.pistoes.enchimento.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <PistaoTrava posicao={pistaoEnchimento.posicao} />
          </div>

          {/* Pistão Arrolhador */}
          <div style={{
            position: 'absolute',
            left: `${pos.pistoes.arrolhador.left}px`,
            bottom: `${pos.pistoes.arrolhador.bottom}px`,
            transform: `scale(${pos.pistoes.arrolhador.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <PistaoTrava posicao={pistaoArrolhador.posicao} />
          </div>

          {/* Pistão Prensa */}
          <div style={{
            position: 'absolute',
            left: `${pos.pistoes.prensa.left}px`,
            bottom: `${pos.pistoes.prensa.bottom}px`,
            transform: `scale(${pos.pistoes.prensa.scale})`,
            transformOrigin: 'bottom center'
          }}>
            <PistaoTrava posicao={pistaoPrensa.posicao} />
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