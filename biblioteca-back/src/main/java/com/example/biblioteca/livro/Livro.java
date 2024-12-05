package com.example.biblioteca.livro;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Table(name = "livros")
@Entity(name = "livros")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Livro {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "autor")
    private String autor;

    @Column(unique = true)
    private String isbn;

    @Column(name = "imagem")
    private String imagem;

    @Setter
    @Column(name = "disponibilidade")
    private Boolean disponibilidade;

    @Setter
    @Column(nullable = true)
    private String clienteEmail;


    public Livro(LivroRequestDTO data){
        this.imagem = data.imagem();
        this.titulo = data.titulo();
        this.autor = data.autor();
        this.isbn = data.isbn();
        this.disponibilidade = data.disponibilidade();
        this.clienteEmail = null;
    }
}
