import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Form from './components/form/form';
import { useRegisterMutate } from './hooks/useRegisterMutate';

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { mutate: registerMutation } = useRegisterMutate(); 
  const navigate = useNavigate(); 

  const handleRegister = (data: { email: string; senha: string }) => {
    setIsLoading(true);
    registerMutation(data, {
      onSuccess: () => {
        setIsLoading(false);
        navigate('/login'); 
      },
      onError: (err: any) => {
        setIsLoading(false);
        setError('Erro ao se cadastrar');
      },
    });
  };

  return (
    <div>
      <Form onSubmit={handleRegister} isLoading={isLoading} error={error} isCadastro={true} />
    </div>
  );
};

export default SignUpPage;
