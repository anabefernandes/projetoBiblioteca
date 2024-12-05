import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodosLivros } from './TodosLivros'; 
import LoginPage from './LoginPage'; 

import './App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      console.log('Token encontrado:', token); 
      navigate('/livros'); 
    } else {
      console.log('Nenhum token encontrado');
    }
  }, [navigate]);

  return (
    <div>
      {!isAuthenticated ? (
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <TodosLivros />
      )}
    </div>
  );
};

export default App;
