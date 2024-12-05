package com.example.biblioteca.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //cors nas url
                .allowedOrigins("http://localhost:5173") // essa é a url do front
                .allowedMethods("GET", "POST", "PUT", "DELETE") // metodos
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
