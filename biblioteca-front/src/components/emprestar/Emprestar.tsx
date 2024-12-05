import { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { useBibliotecaDataMutate } from '../../hooks/useBibliotecaDataMutate'; 
import fecharIcon from '../../assets/images/fechar.png';


import './Emprestar.css';

const Emprestar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { emprestarMutation } = useBibliotecaDataMutate();
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !id) {
      setAlertMessage('Por favor, insira um email válido e tente novamente.');
      return;
    }
  
    try {
      await emprestarMutation.mutateAsync({ id: parseInt(id), email });
      setAlertMessage('Livro emprestado com sucesso!');
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Erro ao emprestar o livro:', error);
      setAlertMessage('Erro ao realizar o empréstimo. Tente novamente.');
    }
  };

  const handleClose = () => {
    navigate('/');
   };

  return (
    <div className="emprestimo-container">
      <div className='formContainerEmail'>
      <img
        src={fecharIcon} 
        alt="Excluir"
        className="icon-fechar2"
        onClick={handleClose}
      />
      <form onSubmit={handleSubmit}>
      <h2 className='tituloEmprestar'>Emprestar Livro</h2>
        <div>
          <label htmlFor="email">Email do Cliente:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirmar Empréstimo</button>
      </form>

      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
    </div>
  );
};

export default Emprestar;