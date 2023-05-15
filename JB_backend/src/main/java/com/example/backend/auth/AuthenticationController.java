package com.example.backend.auth;

import com.example.backend.controller.UserController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://jahazbooker-frontend:3000", "http://jahaz-booker.com"})
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
  Logger logger = LoggerFactory.getLogger(UserController.class);
  private final AuthenticationService service;

  @PostMapping("/register")
  public AuthenticationResponse register(
      @RequestBody RegisterRequest request
  ) {
    logger.info("[Register User] - [POST]");
    return service.register(request);
  }
  @PostMapping("/register-admin")
  public AuthenticationResponse register_admin(
          @RequestBody RegisterRequest request
  ) {
    logger.info("[Register Admin] - [POST]");
    return service.register_admin(request);
  }
  @PostMapping("/authenticate")
  public AuthenticationResponse authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    logger.info("[Authenticate] - [POST]");
    return service.authenticate(request);
  }


}
