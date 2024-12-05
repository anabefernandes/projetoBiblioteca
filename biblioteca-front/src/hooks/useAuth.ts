import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginData, CadastroData } from '../interface/AuthData';

const API_URL = 'http://localhost:8080';

const login = async (data: LoginData): Promise<{ token: string }> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

const cadastrar = async (data: CadastroData): Promise<void> => {
  await axios.post(`${API_URL}/cadastro`, data);
};

export function useLoginMutation() {
  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      alert('Login realizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao realizar login:', error);
      alert('Não foi possível realizar o login.');
    },
  });

  return loginMutation;
}

export function useCadastroMutation() {
  const cadastroMutation = useMutation({
    mutationFn: (data: CadastroData) => cadastrar(data),
    onSuccess: () => {
      alert('Cadastro realizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao realizar cadastro:', error);
      alert('Não foi possível realizar o cadastro.');
    },
  });

  return cadastroMutation;
}
