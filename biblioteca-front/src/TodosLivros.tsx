import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBibliotecaData } from './hooks/useBibliotecaData';
import { Card } from './components/card/card';
import noBooks from "./assets/images/noBooks.png";
import { Footer } from './components/footer/footer';
import { useBibliotecaDataMutate } from './hooks/useBibliotecaDataMutate';
import { CreateModal } from './components/create-modal/create-modal';
import { BibliotecaData } from './interface/BibliotecaData';
import { Navbar } from './components/navbar/navbar';

import './App.css';

export const TodosLivros: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'titulo' | 'autor'>('titulo');
  const { data: livros = [], refetch } = useBibliotecaData();
  const { adicionarLivroMutation, devolverMutation, removerLivroMutation } = useBibliotecaDataMutate(refetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchLivros = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8080/livros', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        refetch();
      }
    } catch (error) {
      console.error('Erro ao buscar livros', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleOpenModal = () => setIsModalOpen((prev) => !prev);

  const handleEmprestar = (id: number | undefined) => {
    if (id !== undefined) {
      console.log(`Emprestando livro com ID ${id}`);
    } else {
      console.error('ID não encontrado!');
    }
  };

  const handleExcluirLivro = (livro: BibliotecaData) => {
    if (!livro?.id) {
      console.error('Informações do livro inválidas para exclusão.');
      return;
    }
    else {
      removerLivroMutation.mutate(livro.id);
    }
  };

  const handleAdicionarLivro = (novoLivro: BibliotecaData) => {
    if (novoLivro) {
      console.log('Adicionando livro:', novoLivro);
      adicionarLivroMutation.mutate(novoLivro);
    }
  };

  const handleDevolverLivro = async (id?: number) => {
    if (id === undefined) {
      console.error('ID inválido para devolver o livro');
      return;
    }
    if (window.confirm('Tem certeza que deseja devolver este livro?')) {
      await devolverMutation.mutateAsync(id);
      refetch();
    }
  };

  const filtrarLivros = livros.filter((livro) =>
    livro[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar
        onOpenModal={handleOpenModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />

      <div className="container">
        <h2 className='titulo-principal'>Todos os Títulos</h2>

        {/* Lista de livros */}
        <div className="card-grid">
          {filtrarLivros.length > 0 ? (
            filtrarLivros.map((livro) => (
              <Card
                key={livro.id}
                id={livro.id || 0}
                titulo={livro.titulo}
                autor={livro.autor}
                isbn={livro.isbn}
                imagem={livro.imagem}
                disponibilidade={livro.disponibilidade}
                clienteEmail={livro.clienteEmail || ''}
                onEmprestar={() => handleEmprestar(livro.id)}
                onDevolver={handleDevolverLivro}
                onExcluir={() => handleExcluirLivro(livro)}
              />
            ))
          ) : (
            <div className="no-books">
              <img src={noBooks} alt="Nenhum livro encontrado" />
            </div>
          )}
        </div>

        {/* Modal para adicionar livro */}
        {isModalOpen && <CreateModal closeModal={handleOpenModal} onSubmit={handleAdicionarLivro} />}
      </div>

      <Footer />
    </>
  );
};
