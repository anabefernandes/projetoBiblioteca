import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BibliotecaData } from '../interface/BibliotecaData';

const API_URL = 'http://localhost:8080';

const adicionarLivro = async (data: BibliotecaData): Promise<BibliotecaData> => {
  const response = await axios.post(`${API_URL}/biblioteca`, data);
  return response.data;
};

const emprestarLivro = async ({ id, email }: { id: number; email: string }): Promise<void> => {
  await axios.patch(`${API_URL}/biblioteca/${id}/emprestimo`, { email });
};

const devolverLivro = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/biblioteca/${id}/devolucao`);
};

const removerLivro = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/biblioteca/${id}`);
};

export function useBibliotecaDataMutate(onSuccessCallback?: () => void) {
  const adicionarLivroMutation = useMutation({
    mutationFn: (data: BibliotecaData) => adicionarLivro(data),
    onSuccess: () => {
      alert('Livro adicionado com sucesso!');
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error('Erro ao adicionar livro:', error);
      alert('Não foi possível adicionar o livro.');
    },
  });

  const removerLivroMutation = useMutation({
    mutationFn: (id: number) => removerLivro(id),
    onSuccess: () => {
      alert('Livro removido com sucesso!');
      onSuccessCallback?.(); 
    },
    onError: (error) => {
      console.error('Erro ao remover o livro:', error);
      alert('Não foi possível remover o livro.');
    },
  });

  const emprestarMutation = useMutation({
    mutationFn: ({ id, email }: { id: number; email: string }) => emprestarLivro({ id, email }),
    onMutate: () => {
      console.log('Tentando emprestar livro...');
    },
    onSuccess: () => {
      alert('Livro emprestado com sucesso!');
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error('Erro ao emprestar livro:', error);
      alert('Não foi possível emprestar o livro. Tente novamente.');
    },
    onSettled: () => {
      console.log('Mutação de empréstimo finalizada');
    }
  });

  const devolverMutation = useMutation({
    mutationFn: (id: number) => devolverLivro(id),
    onSuccess: () => {
      alert('Livro devolvido com sucesso!');
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error('Erro ao devolver livro:', error);
      alert('Não foi possível devolver o livro.');
    },
  });

  return {
    adicionarLivroMutation,
    removerLivroMutation,
    emprestarMutation,
    devolverMutation,
  };
}
