package auth_gateway_spring.auth_gateway_spring.services.impl;

import auth_gateway_spring.auth_gateway_spring.auth.JwtUtil;
import auth_gateway_spring.auth_gateway_spring.dto.AuthResponseDTO;
import auth_gateway_spring.auth_gateway_spring.dto.LoginRequestDTO;
import auth_gateway_spring.auth_gateway_spring.repositories.UserRepository;
import auth_gateway_spring.auth_gateway_spring.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager; // El gestor configurado en SecurityConfig

    @Autowired
    private JwtUtil jwtUtil; // La herramienta para generar tokens

    @Autowired
    private UserRepository userRepository;

    // Implementamos el método register para crear nuevos usuarios fácilmente.
    // Esto es útil para la simulación, aunque el proyecto solo requiera un rol.
    @Override
    public AuthResponseDTO register(LoginRequestDTO request) {
        // En un proyecto real, necesitarías encriptar la contraseña aquí y guardar el usuario.
        // Pero como ya usamos CommandLineRunner para el 'admin', por ahora lo dejamos vacío.
        return null;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        // Validar Credenciales (Esto invoca CustomUserDetailsService y PasswordEncoder)
        // Si las credenciales son inválidas, lanza una excepción de Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        // Si la autenticación fue exitosa, obtenemos los detalles del usuario
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Generar el Token JWT
        String token = jwtUtil.generateToken(userDetails);
        // Devolver la respuesta al cliente
        return new AuthResponseDTO(token);
    }
}