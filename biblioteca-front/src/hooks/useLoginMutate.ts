// src/hooks/useLoginMutate.ts

import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { LoginData } from '../interface/AuthData';

export const useLoginMutate = () => {
  return useMutation<string, Error, LoginData>({
    mutationFn: login, 
    onSuccess: (data) => {
      console.log('Login realizado com sucesso:', data);
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error);
    },
  });
};
