package auth_gateway_spring.auth_gateway_spring.repositories;

import auth_gateway_spring.auth_gateway_spring.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // Spring crea el SQL automáticamente al leer el nombre del metodo
    Optional<UserEntity> findByUsername(String username);

    //  metodo útil para validaciones
    boolean existsByUsername(String username);
}