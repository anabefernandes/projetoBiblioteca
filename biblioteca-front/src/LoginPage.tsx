import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from './api/auth'; 
import './components/create-modal/modal.css';  
import bibliotecaImage from './assets/images/biblioteca.png';
import logoImage from './assets/images/somentelogo.png';

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (data: { email: string; senha: string }) => {
    setIsLoading(true);
    setError(undefined); 

    try {
      const response = await loginService(data);

      const { token, email: userEmail } = response;
      localStorage.setItem('token', token); 
      localStorage.setItem('email', userEmail); 
      setIsAuthenticated(true); 
      
      navigate('/livros');
    } catch (err) {
      setIsLoading(false);
      console.error('Erro de login:', err);
    }
  };

  const handleRedirectToSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div
      className="modal"
      style={{
        backgroundImage: `url(${bibliotecaImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form className="formModal" onSubmit={(e) => {
        e.preventDefault();
        handleLogin({ email, senha });
      }}>

        <img 
          src={logoImage} 
          alt="Logo" 
          style={{
            width: '55px',  
            height: 'auto',
            display: 'block',  
            marginLeft: 'auto', 
            marginRight: 'auto', 
            marginBottom: '-20px',
          }} 
        />

        <h2 className="tituloModal">Entrar</h2>

        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="inputField"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <a className="login-signup-link" onClick={handleRedirectToSignUp}>
          Não tem uma conta? Cadastre-se
        </a>

        <button className="buttonModal" type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
