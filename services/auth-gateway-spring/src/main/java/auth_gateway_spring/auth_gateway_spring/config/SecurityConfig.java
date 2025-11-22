package auth_gateway_spring.auth_gateway_spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate; // Para el Gateway

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // --- Bean 1: Codificador de Contraseñas
    // Usaremos BCrypt, el estándar para encriptar contraseñas.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // --- Bean 2: Authentication Manager ---
    // Maneja el proceso de autenticación (login).
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // --- Bean 3: RestTemplate (Para el Proxy Gateway) ---
    // Necesario para que el Gateway haga llamadas HTTP a Django y NestJS.
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // --- Bean 4: Cadena de Filtros de Seguridad ---
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // APIs REST no usan CSRF (Cross-Site Request Forgery)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Usaremos JWT, no sesiones
                .authorizeHttpRequests(auth -> auth
                        // Rutas Públicas (Auth y Monitoreo)
                        .requestMatchers("/auth/**").permitAll() // Login, Registro
                        .requestMatchers("/health").permitAll()  // Health Check

                        // Rutas Protegidas (El tráfico del Gateway)
                        // TODAS las rutas de la API deben pasar por el filtro JWT que añadiremos después.
                        .requestMatchers("/api/v1/**").authenticated() // Rutas que requieren JWT

                        .anyRequest().authenticated()
                );

        // TODO: En un paso posterior, añadiremos un filtro antes del UsernamePasswordAuthenticationFilter
        // para interceptar el JWT y validar la identidad.

        return http.build();
    }
}