package auth_gateway_spring.auth_gateway_spring.config;

import auth_gateway_spring.auth_gateway_spring.entities.UserEntity;
import auth_gateway_spring.auth_gateway_spring.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitialDataSeeder {

    @Bean
    public CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // 1. Verificar si el usuario administrador ya existe
            if (!userRepository.existsByUsername("admin")) {

                // 2. Crear el objeto de usuario
                UserEntity adminUser = UserEntity.builder() // Usamos el builder de Lombok
                        .username("admin")
                        // Encriptamos la contraseña usando BCrypt antes de guardar
                        .password(passwordEncoder.encode("adminpassword"))
                        .role("ADMIN")
                        .build();

                // 3. Guardar en la base de datos
                userRepository.save(adminUser);
                System.out.println("\n\n>>> USUARIO ADMINISTRADOR CREADO: admin / adminpassword");
                System.out.println(">>> PASSWORD HASHED: " + adminUser.getPassword() + "\n");
            }
        };
    }
}