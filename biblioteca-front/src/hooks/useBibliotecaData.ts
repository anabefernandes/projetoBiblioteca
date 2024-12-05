import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BibliotecaData } from '../interface/BibliotecaData';

const API_URL = 'http://localhost:8080';

const fetchData = async (): Promise<BibliotecaData[]> => {
  const response = await axios.get(API_URL + '/biblioteca');
  return response.data; 
};

export function useBibliotecaData() {
  const query = useQuery<BibliotecaData[], Error>({
    queryFn: fetchData,
    queryKey: ['biblioteca-data'],
    retry: 2
  });

  return {
    ...query,
    data: query.data ?? []  
  };
}
