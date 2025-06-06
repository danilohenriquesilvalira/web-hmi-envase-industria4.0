import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  FileText, 
  Play, 
  BarChart3, 
  Calendar,
  Power, 
  User,
  Bell,
  RefreshCw,
  Menu 
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 overflow-hidden font-sans"> {/* font-sans para fonte moderna */}
      {/* Header HMI */}
      <header className="bg-white shadow-md border-b border-gray-200 h-16 flex-shrink-0"> {/* shadow-md e border-gray-200 para um visual mais leve */}
        <div className="h-full flex items-center justify-between px-6"> {/* px-6 para um pouco mais de espaçamento */}
          {/* Left Section - Hambúrguer Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" /* hover e focus mais sutis */
              title={isSidebarOpen ? "Esconder Sidebar" : "Mostrar Sidebar"}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Center Section - Nome Centralizado e Estilizado */}
          {/* Flexbox para centralizar horizontalmente */}
          <div className="absolute left-1/2 -translate-x-1/2"> {/* Posicionamento absoluto para centralizar o bloco */}
            <div className="text-xl font-extrabold text-gray-800 tracking-wide"> {/* Fontes mais modernas */}
              Danilo Lira - Automação Industrial 
            </div>
          </div>

          {/* Right Section - Auto Mode Toggle, DateTime, Alerts, and Operator Info */}
          <div className="flex items-center space-x-6"> {/* space-x-6 para mais espaçamento */}
            {/* Auto Mode Toggle */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <RefreshCw size={14} className="text-white" />
              </div>
              <button 
                onClick={() => setIsAutoMode(!isAutoMode)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-colors shadow-sm ${ /* rounded-full e shadow-sm */
                  isAutoMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' /* Azul mais escuro no hover */
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Automático
              </button>
            </div>

            {/* DateTime */}
            <div className="text-sm text-gray-600 text-right">
              <div className="font-medium text-gray-700">14:30 16 Nov</div> {/* Cor mais escura */}
            </div>

            {/* Alerts */}
            <div className="flex items-center space-x-2">
              <Bell size={20} className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" /> {/* Hover e cursor */}
              <div className="text-xs text-gray-500">No active alerts</div>
            </div>

            {/* Operator Info */}
            <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-full shadow-sm"> {/* rounded-full, space-x-3, shadow-sm */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"> {/* Azul mais escuro */}
                <User size={16} className="text-white" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-800">Danilo Lira</div> {/* font-semibold */}
                <div className="text-gray-500 text-xs">Desenvolvedor</div>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full ml-2 flex-shrink-0"></div> {/* flex-shrink-0 para evitar encolhimento */}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar removida */}
        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;