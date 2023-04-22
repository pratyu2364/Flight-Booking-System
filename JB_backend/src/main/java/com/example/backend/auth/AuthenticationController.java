package com.example.backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://jahazbooker-frontend:3000"})
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public AuthenticationResponse register(
      @RequestBody RegisterRequest request
  ) {
    return service.register(request);
  }
  @PostMapping("/register-admin")
  public AuthenticationResponse register_admin(
          @RequestBody RegisterRequest request
  ) {
    return service.register_admin(request);
  }
  @PostMapping("/authenticate")
  public AuthenticationResponse authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return service.authenticate(request);
  }


}
