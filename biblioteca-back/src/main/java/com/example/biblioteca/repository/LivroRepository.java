package com.example.biblioteca.repository;

import com.example.biblioteca.livro.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByTituloContainingIgnoreCase(String titulo);
    List<Livro> findByAutorContainingIgnoreCase(String autor);
    List<Livro> findByDisponibilidadeTrue();
    List<Livro> findByDisponibilidadeFalse();
    long countByClienteEmailAndDisponibilidadeFalse(String email);
}
