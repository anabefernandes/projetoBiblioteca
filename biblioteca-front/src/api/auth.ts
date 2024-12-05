import axios from 'axios';
import { LoginData, CadastroData } from '../interface/AuthData';

export const register = async (data: CadastroData) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/register', data);
    return response.data;
  } catch (error) {
    alert('Erro ao cadastrar bibliotecário!'); 
    throw new Error('Erro ao cadastrar bibliotecário!');
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', data);
    const { token, email } = response.data; 

    localStorage.setItem('token', token); 
    localStorage.setItem('email', email); 

    return response.data;
  } catch (error) {
    alert('Erro ao fazer login!');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};
