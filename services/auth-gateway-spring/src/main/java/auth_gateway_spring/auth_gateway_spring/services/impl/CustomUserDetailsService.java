package auth_gateway_spring.auth_gateway_spring.services.impl;

import auth_gateway_spring.auth_gateway_spring.entities.UserEntity;
import auth_gateway_spring.auth_gateway_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Busca en MySQL
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Aquí pasamos una lista vacía de autoridades (roles) por simplicidad,
        return new User(userEntity.getUsername(), userEntity.getPassword(), new ArrayList<>());
    }
}