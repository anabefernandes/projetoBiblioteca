import React, { useState } from 'react';
import { BibliotecaData } from '../../interface/BibliotecaData';
import fecharIcon from '../../assets/images/fechar.png';
import './modal.css';

interface CreateModalProps {
  closeModal: () => void;
  onSubmit: (novoLivro: BibliotecaData) => void;
}

export function CreateModal({ closeModal, onSubmit }: CreateModalProps) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [imagem, setImagem] = useState('');
  const [disponibilidade, setDisponibilidade] = useState(true);
  const [clienteEmail, setClienteEmail] = useState<string | undefined>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const verificarIsbn = async (isbn: string) => {
    try {
      const response = await fetch(`http://localhost:8080/biblioteca/verificar-isbn/${isbn}`);
      const data = await response.json();
      return data.existe; 
    } catch (error) {
      console.error('Erro ao validar o ISBN:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isbnValido = await verificarIsbn(isbn);
    if (!isbnValido) {
      setErrorMessage('O ISBN fornecido não foi encontrado.'); 
      return;
    }

    const novoLivro: BibliotecaData = {
      titulo,
      autor,
      isbn,
      imagem,
      disponibilidade,
      clienteEmail: clienteEmail || undefined,
    };

    onSubmit(novoLivro);
    closeModal();
  };

  return (
    <div className="modal">
      <form className='formModal' onSubmit={handleSubmit}>
        <img
          src={fecharIcon}
          alt="Fechar"
          className="icon-close"
          onClick={closeModal}
        />
        <h2 className='tituloModal'>Cadastrar Novo Livro</h2>
        <input
          className='inputField'
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          className='inputField'
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          className='inputField'
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input 
          className='inputField'
          type="text"
          placeholder="Imagem URL"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          required
        />
        <label className='checkboxLabel'>
          Disponível
          <input
            className='checkboxField'
            type="checkbox"
            checked={disponibilidade}
            onChange={() => setDisponibilidade((prev) => !prev)}
            required
          />
        </label>
        <input
          className='inputField'
          type="email"
          placeholder="Email do Cliente (opcional)"
          value={clienteEmail}
          onChange={(e) => setClienteEmail(e.target.value)}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
        <button className='buttonModal' type="submit">Adicionar Livro</button>
      </form>
    </div>
  );
}