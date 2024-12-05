import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BibliotecaData } from '../interface/BibliotecaData';

const API_URL = 'http://localhost:8080';

const buscarLivros = async (searchTerm: string, searchBy: 'titulo' | 'autor'): Promise<BibliotecaData[]> => {
  try {
    const response = await axios.get(`${API_URL}/biblioteca/buscar/${searchBy}`, {
      params: { [searchBy]: searchTerm },
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
};

export function useBibliotecaBusca(searchTerm: string, searchBy: 'titulo' | 'autor') {
  return useQuery<BibliotecaData[], Error>({
    queryFn: () => buscarLivros(searchTerm, searchBy), 
    queryKey: ['buscarLivros', searchTerm, searchBy],
    retry: 2
  });
}