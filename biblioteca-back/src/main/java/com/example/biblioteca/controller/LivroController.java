package com.example.biblioteca.controller;
import com.example.biblioteca.livro.Livro;
import com.example.biblioteca.livro.LivroRequestDTO;
import com.example.biblioteca.livro.LivroResponseDTO;
import com.example.biblioteca.repository.LivroRepository;
import com.example.biblioteca.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("biblioteca")
public class LivroController {

    @OneToMany(mappedBy = "biblioteca", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Livro> livros;
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private LivroRepository repository;
    @Autowired
    private EmailService emailService;

    @Operation(summary = "Salva os livros")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @PostMapping
    public void saveLivro(@RequestBody LivroRequestDTO data) {
        Livro livroData = new Livro(data);
        repository.save(livroData);
    }

    @Operation(summary = "Mostra todos os livros")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @GetMapping
    public List<LivroResponseDTO> getAll() {
        return repository.findAll().stream().map(LivroResponseDTO::new).toList();
    }

    //endpoint para emprestar o livro e mudar a disponibilidade
    @Operation(summary = "Empresta o livro, muda a disponibilidade e envia email")
    @CrossOrigin(origins = "http://localhost:5173")
    @PatchMapping("/{id}/emprestimo")
    public ResponseEntity<String> emprestarLivro(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        String email = body.get("email");

        Livro livro = repository.findById(id).orElse(null);
        if (livro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro não encontrado.");
        }

        long livrosEmprestados = repository.countByClienteEmailAndDisponibilidadeFalse(email);
        if (livrosEmprestados >= 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Limite de livros emprestados excedido.");
        }

        livro.setDisponibilidade(false);
        livro.setClienteEmail(email);

        try {

            repository.save(livro);

            emailService.enviarEmail(email, "Confirmação de Empréstimo de Livro",
                    "Olá, você acabou de alugar o livro '" + livro.getTitulo() + "'. Aproveite a leitura!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao enviar e-mail.");
        }

        return ResponseEntity.ok("Livro emprestado com sucesso!");
    }


    @Operation(summary = "Devolve o livro")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @PatchMapping("/{id}/devolucao")
    public ResponseEntity<String> devolverLivro(@PathVariable Long id) {
        Livro livro = repository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
        if (!livro.getDisponibilidade()) {
            livro.setDisponibilidade(true);
            livro.setClienteEmail(null);
            repository.save(livro);
            return ResponseEntity.ok("Livro devolvido com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("O livro já está disponível.");
        }
    }

    @Operation(summary = "Busca por titulo")
    @GetMapping("/buscar/titulo")
    public ResponseEntity<List<Livro>> buscarPorTitulo(@RequestParam String titulo) {
        List<Livro> livros = repository.findByTituloContainingIgnoreCase(titulo);
        if (livros.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(livros);
        }
        return ResponseEntity.ok(livros);
    }

    @Operation(summary = "Busca por autor")
    @GetMapping("/buscar/autor")
    public ResponseEntity<List<Livro>> buscarPorAutor(@RequestParam String autor) {
        List<Livro> livros = repository.findByAutorContainingIgnoreCase(autor);
        if (livros.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(livros);
        }
        return ResponseEntity.ok(livros);
    }

    @Operation(summary = "Mostra todos os livros disponiveis")
    @GetMapping("/disponiveis")
    public ResponseEntity<List<Livro>> disponibilidade() {
        List<Livro> livrosDisponiveis = repository.findByDisponibilidadeTrue();
        if (livrosDisponiveis.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(livrosDisponiveis);
        }
        return ResponseEntity.ok(livrosDisponiveis);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/verificar-isbn/{isbn}")
    public ResponseEntity<Map<String, Object>> verificaIsbn(@PathVariable String isbn) {
        Map<String, Object> response = new HashMap<>();
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://openlibrary.org/api/volumes/brief/json/ISBN:" + isbn;
            ResponseEntity<String> apiResponse = restTemplate.getForEntity(url, String.class);
            System.out.println(apiResponse.getBody());
            boolean livroExiste = apiResponse.getBody().contains("\"items\":");
            response.put("existe", livroExiste);
            response.put("mensagem", livroExiste ? "ISBN encontrado." : "ISBN não encontrado.");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("existe", false);
            response.put("mensagem", "Erro ao verificar ISBN.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Mostra todos os livros indisponiveis")
    @GetMapping("/indisponiveis")
    public ResponseEntity<List<Livro>> indisponibilidade() {
        List<Livro> livrosIndisponiveis = repository.findByDisponibilidadeFalse();
        if (livrosIndisponiveis.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(livrosIndisponiveis);
        }
        return ResponseEntity.ok(livrosIndisponiveis);
    }

    @Operation(summary = "Deleta um livro")
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivro(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
