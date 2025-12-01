package auth_gateway_spring.auth_gateway_spring.controllers;

import auth_gateway_spring.auth_gateway_spring.dto.AuthResponseDTO;
import auth_gateway_spring.auth_gateway_spring.dto.LoginRequestDTO;
import auth_gateway_spring.auth_gateway_spring.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}