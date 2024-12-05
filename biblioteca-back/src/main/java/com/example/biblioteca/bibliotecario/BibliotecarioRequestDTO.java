package com.example.biblioteca.bibliotecario;


import jakarta.validation.constraints.NotBlank;

public record BibliotecarioRequestDTO(@NotBlank String email, @NotBlank String senha) {

}
