import React, { useState } from 'react';
import SistemaEnvase from '../components/enchimento/SistemaEnvase';
import ProcessoFluxograma from '../components/processo/ProcessoFluxograma';

const Home = () => {
  // Estado para controlar qual visualização está ativa
  const [activeView, setActiveView] = useState<'enchimento' | 'processo'>('enchimento');

  return (
    <div>
      {/* Menu de navegação */}
      <div className="flex gap-4 p-4 bg-gray-100">
        <button
          onClick={() => setActiveView('enchimento')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'enchimento'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Sistema de Envase
        </button>
        <button
          onClick={() => setActiveView('processo')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'processo'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Processo (ISA 104)
        </button>
      </div>

      {/* Conteúdo - mantendo área totalmente livre para cada visualização */}
      {activeView === 'enchimento' ? (
        <SistemaEnvase />
      ) : (
        <ProcessoFluxograma />
      )}
    </div>
  );
};

export default Home;