import React, { useState } from 'react';
import { useBibliotecaData } from './hooks/useBibliotecaData';
import { Card } from './components/card/card';
import noBooks from "./assets/images/noBooks.png";
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { useBibliotecaDataMutate } from './hooks/useBibliotecaDataMutate';
import { BibliotecaData } from './interface/BibliotecaData';
import './App.css';
import { CreateModal } from './components/create-modal/create-modal';
import backIcon from './assets/images/volte.png'; 
import { useNavigate } from 'react-router-dom';

export const LivrosIndisponiveis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'titulo' | 'autor'>('titulo');
  const { data: livros = [], refetch } = useBibliotecaData();
  const { adicionarLivroMutation, devolverMutation, removerLivroMutation } = useBibliotecaDataMutate(refetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

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
    if (window.confirm(`Tem certeza que deseja excluir o livro "${livro.titulo}"?`)) {
      removerLivroMutation.mutate(livro.id);
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

  const livrosIndisponiveis = livros.filter((livro) => !livro.disponibilidade);

  const filtrarLivros = livrosIndisponiveis.filter((livro) =>
    livro[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <Navbar 
        onOpenModal={handleOpenModal} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        searchBy={searchBy} 
        setSearchBy={setSearchBy} 
      />

      <div className="container">
      <div className="volte" style={{
        position: 'absolute',
        left: '150px',
        cursor: 'pointer',
        top: '20%',
      }} onClick={() => navigate('/')}>
        <img 
          src={backIcon} 
          alt="volte" 
          style={{
            width: '35px',
            height: 'auto',
            display: 'block',
            marginBottom: '-20px',
          }} 
        />
      </div>
        <h2 className="titulo-principal">Livros Indisponíveis</h2>

        {/* Lista de livros indisponíveis */}
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
              <img src={noBooks} alt="Nenhum livro indisponível" />
            </div>
          )}
        </div>
      </div>

      {/* Modal para adicionar livro */}
      {isModalOpen && <CreateModal closeModal={handleOpenModal} onSubmit={(novoLivro: BibliotecaData) => {
        console.log('Adicionando livro:', novoLivro);
        adicionarLivroMutation.mutate(novoLivro);
      }} />}
      
      {/* Footer */}
      <Footer />
    </>
  );
};
