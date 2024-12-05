import { useMutation } from '@tanstack/react-query';
import { register } from '../api/auth'; 
import { CadastroData } from '../interface/AuthData'; 

export const useRegisterMutate = () => {
  return useMutation<CadastroData, Error, CadastroData>({
    mutationFn: register, 
    onSuccess: (data) => {
      console.log('Bibliotecário cadastrado com sucesso:', data);
    },
    onError: (error: Error) => {
      console.error('Erro ao cadastrar bibliotecário:', error.message);
    },
  });
};
