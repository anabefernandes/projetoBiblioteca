package com.example.biblioteca.repository;

import com.example.biblioteca.bibliotecario.Bibliotecario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BibliotecarioRepository extends JpaRepository<Bibliotecario, Long> {
    Optional<Bibliotecario> findByEmail(String email);
}
