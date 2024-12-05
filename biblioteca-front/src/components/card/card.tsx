import './card.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import fecharIcon from '../../assets/images/fechar.png';

interface CardProps {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  imagem: string;
  disponibilidade: boolean;
  clienteEmail: string;
  bibliotecario?: string;
  onEmprestar: () => void; 
  onDevolver: (id?: number) => Promise<void>;
  onExcluir: () => void; 
}

export const Card: React.FC<CardProps> = ({
  id,
  titulo,
  autor,
  isbn,
  imagem,
  disponibilidade,
  clienteEmail,
  bibliotecario,
  onDevolver,
  onExcluir,
}) => {
  const navigate = useNavigate();

  const handleEmprestar = () => {
    navigate(`/emprestar/${id}`); 
  }; 

  const handleExcluir = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o livro "${titulo}"?`)) {
      await onExcluir(); 
    }
  };

  return (
    <div className="card">
      <img src={fecharIcon} alt="Excluir" className="icon-fechar" onClick={handleExcluir} />
      <img src={imagem} alt={titulo} />
      <h2>{titulo}</h2>
      <h3>{autor}</h3>
      <p><b>ISBN:</b> {isbn}</p>
      <p>
        <span className={`status-indicator ${disponibilidade ? "disponivel" : "indisponivel"}`}>
        </span>
        {disponibilidade ? (
          "Disponível"
        ) : (
          <>
            Indisponível
            <span className="emprestado-info">
              (Emprestado para: {clienteEmail || "N/A"})
            </span>
            {bibliotecario && (
              <span className="bibliotecario-info">
                (Emprestado por: {bibliotecario})
              </span>
            )}
          </>
        )}
      </p>
      <div className="card-buttons">
        {disponibilidade ? (
          <button className="btn-emprestar" onClick={handleEmprestar}>Emprestar</button>
        ) : (
          <button className="btn-devolver" onClick={() => onDevolver(id)}>Devolver</button>
        )}
      </div>
    </div>
  );
};
