import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

// Páginas
import Home from './pages/home';
// import Dashboard from './pages/Dashboard';
// import Settings from './pages/Settings';
// import Profile from './pages/Profile';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter basename="/hmi-cip-system">
      <Layout>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Futuras páginas */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/configuracoes" element={<Settings />} /> */}
          {/* <Route path="/perfil" element={<Profile />} /> */}
          
          {/* Fallback para rotas não encontradas */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;