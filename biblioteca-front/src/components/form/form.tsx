import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../create-modal/modal.css';
import bibliotecaImage from '../../assets/images/biblioteca.png';
import logoImage from '../../assets/images/somentelogo.png';
import backIcon from '../../assets/images/volte.png'; 

interface FormProps {
  onSubmit: (data: { email: string; senha: string }) => void;
  isLoading: boolean;
  error?: string;
  isCadastro: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, isLoading, error, isCadastro }) => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const navigate = useNavigate();  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, senha });
  };

  const handleBackToLogin = () => {
    navigate('/login');  
  };

  return (
    <div className="modal"
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
      <form className='formModal' onSubmit={handleSubmit}>

        <img 
          src={backIcon} 
          alt="Voltar"
          onClick={handleBackToLogin}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '30px', 
            height: 'auto',
            cursor: 'pointer',
          }} 
        />

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

        <h2 className='tituloModal'>Cadastro de bibliotecário:</h2>
        
        <label>
          Email:
          <input
            className='inputField'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha:
          <input
            className='inputField'
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className='buttonModal' type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : isCadastro ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Form;
