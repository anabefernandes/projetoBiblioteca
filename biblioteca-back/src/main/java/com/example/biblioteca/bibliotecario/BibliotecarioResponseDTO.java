package com.example.biblioteca.bibliotecario;

public record BibliotecarioResponseDTO(Long id, String email) {
    public BibliotecarioResponseDTO(Bibliotecario bibliotecario) {
        this(bibliotecario.getId(), bibliotecario.getEmail());
    }
}
