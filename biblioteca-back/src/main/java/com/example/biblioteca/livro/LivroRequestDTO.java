package com.example.biblioteca.livro;

public record LivroRequestDTO(
        String titulo,
        String autor,
        String isbn,
        String imagem,
        Boolean disponibilidade) {
}
