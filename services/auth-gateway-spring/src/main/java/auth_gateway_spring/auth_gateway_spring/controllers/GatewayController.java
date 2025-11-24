package auth_gateway_spring.auth_gateway_spring.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Enumeration;

@RestController
@RequestMapping("/api/v1")
public class GatewayController {

    @Autowired
    private RestTemplate restTemplate;

    // Configuración de URLs (En Docker usarás nombres de servicio, aquí localhost)
    @Value("${gateway.genomics.url:http://localhost:3000/api/v1}")
    private String genomicsUrl;

    @Value("${gateway.clinical.url:http://localhost:3001/api/v1}")
    private String clinicalUrl;

    // --- ENRUTAMIENTO GENÓMICA (Django) ---
    // Captura cualquier método (GET, POST, PUT, DELETE) en /genomics/**
    @RequestMapping(value = "/genomics/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> proxyGenomics(HttpServletRequest request, @RequestBody(required = false) Object body) {
        // Redirigir quitando el prefijo "/api/v1/genomics" para que coincida con la API de Django
        String requestPath = request.getRequestURI();
        String backendPath = requestPath.replace("/api/v1/genomics", "");

        // Construir URL destino: http://localhost:3000/api/v1 + /genes/...
        URI uri = URI.create(genomicsUrl + backendPath);

        return forwardRequest(uri, request, body);
    }

    // --- ENRUTAMIENTO CLÍNICA (NestJS) ---
    @RequestMapping(value = "/clinical/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> proxyClinical(HttpServletRequest request, @RequestBody(required = false) Object body) {
        String requestPath = request.getRequestURI();
        String backendPath = requestPath.replace("/api/v1/clinical", "");

        URI uri = URI.create(clinicalUrl + backendPath);

        return forwardRequest(uri, request, body);
    }

    // --- LÓGICA GENÉRICA DE REENVÍO ---
    private ResponseEntity<?> forwardRequest(URI uri, HttpServletRequest request, Object body) {
        try {
            // 1. Copiar Headers (Importante para pasar el Content-Type y Authorization)
            HttpHeaders headers = new HttpHeaders();
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                headers.add(headerName, request.getHeader(headerName));
            }

            // 2. Crear Entidad HTTP con cuerpo y headers
            HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);

            // 3. Ejecutar la petición al microservicio real
            return restTemplate.exchange(uri, HttpMethod.valueOf(request.getMethod()), httpEntity, String.class);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Si el microservicio responde error (4xx, 5xx), devolverlo tal cual
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en Gateway: " + e.getMessage());
        }
    }
}