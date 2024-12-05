package com.example.biblioteca.controller;

import com.example.biblioteca.bibliotecario.Bibliotecario;
import com.example.biblioteca.bibliotecario.BibliotecarioRequestDTO;

import com.example.biblioteca.bibliotecario.BibliotecarioResponseDTO;
import com.example.biblioteca.repository.BibliotecarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private BibliotecarioRepository bibliotecarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Operation(summary = "Mostrar bibliotecarios")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @GetMapping("/users")
    public List<Bibliotecario> getAllUsers() {
        return bibliotecarioRepository.findAll();
    }

    @Operation(summary = "Cadastra bibliotecário")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody BibliotecarioRequestDTO bibliotecarioRequestDTO) {
        if (bibliotecarioRepository.findByEmail(bibliotecarioRequestDTO.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já registrado!");
        }

        String senhaCriptografada = passwordEncoder.encode(bibliotecarioRequestDTO.senha());

        Bibliotecario bibliotecario = new Bibliotecario(bibliotecarioRequestDTO);
        bibliotecario.setSenha(senhaCriptografada);
        bibliotecarioRepository.save(bibliotecario);

        return ResponseEntity.ok(new BibliotecarioResponseDTO(bibliotecario));
    }

    @Operation(summary = "login")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody BibliotecarioRequestDTO bibliotecarioRequestDTO) {
        Optional<Bibliotecario> bibliotecarioOptional = bibliotecarioRepository.findByEmail(bibliotecarioRequestDTO.email());

        if (bibliotecarioOptional.isPresent()) {
            Bibliotecario bibliotecario = bibliotecarioOptional.get();
            if (passwordEncoder.matches(bibliotecarioRequestDTO.senha(), bibliotecario.getSenha())) {
                return ResponseEntity.ok("Login bem-sucedido!");
            }
        }

        return ResponseEntity.status(401).body("Email ou senha inválidos!");
    }

    @Operation(summary = "Exclui um bibliotecário")
    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        Optional<Bibliotecario> bibliotecarioOptional = bibliotecarioRepository.findById(id);
        if (bibliotecarioOptional.isEmpty()) {
            return "Usuário não encontrado!";
        }

        // Exclui o bibliotecário
        bibliotecarioRepository.deleteById(id);
        return "Usuário excluído com sucesso!";
    }
}
