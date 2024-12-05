package com.example.biblioteca.livro;

public record LivroResponseDTO(
        Long id,
        String titulo,
        String autor,
        String isbn,
        String imagem,
        Boolean disponibilidade,
        String clienteEmail
) {
    public LivroResponseDTO(Livro livro) {
        this(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbn(),
                livro.getImagem(),
                livro.getDisponibilidade(),
                livro.getClienteEmail() 
        );
    }
}
