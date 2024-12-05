import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Emprestar from './components/emprestar/Emprestar';  
import './index.css';
import SignUpPage from './SignUpPage';
import { TodosLivros } from './TodosLivros';
import LoginPage from './LoginPage';
import ProtectedRoute from './components/rota/ProtectedRoute'; 
import { LivrosIndisponiveis } from './LivrosIndisponiveis';
import { LivrosDisponiveis } from './LivrosDisponiveis';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<App />} />
          
          {/* Página de login - acesso livre */}
          <Route path="/login" element={<LoginPage setIsAuthenticated={() => {}} />} />

          {/* Rota de cadastro */}
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* só acessíveis com token no localStorage */}
          <Route element={<ProtectedRoute />}>
            <Route path="/livros" element={<TodosLivros />} />
            <Route path="/disponiveis" element={<LivrosDisponiveis />} />
            <Route path="/indisponiveis" element={<LivrosIndisponiveis />} />
            <Route path="/emprestar/:id" element={<Emprestar />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
