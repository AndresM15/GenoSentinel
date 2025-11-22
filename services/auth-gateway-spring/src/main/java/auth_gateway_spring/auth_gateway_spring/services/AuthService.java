package auth_gateway_spring.auth_gateway_spring.services;

import auth_gateway_spring.auth_gateway_spring.dto.AuthResponseDTO;
import auth_gateway_spring.auth_gateway_spring.dto.LoginRequestDTO;

public interface AuthService {
    AuthResponseDTO login(LoginRequestDTO request);
    AuthResponseDTO register(LoginRequestDTO request);
}