package com.example.biblioteca.bibliotecario;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Table(name = "bibliotecarios")
@Entity(name = "bibliotecarios")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Bibliotecario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(unique = true)
    private String email;

    @Setter
    @Column(nullable = false)
    private String senha;

    public Bibliotecario(BibliotecarioRequestDTO data) {
        this.email = data.email();
        this.senha = data.senha();
    }

}
