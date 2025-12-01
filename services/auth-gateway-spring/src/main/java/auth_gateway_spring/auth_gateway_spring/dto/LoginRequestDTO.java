package auth_gateway_spring.auth_gateway_spring.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String username;
    private String password;
}