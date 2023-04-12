package com.example.backend.auth;
import com.example.backend.config.JwtService;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.ApiException;
import com.example.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepo repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  public AuthenticationResponse register(RegisterRequest request) {
    if(repository.existsByEmail(request.getEmail()))
      throw new ApiException("Email already exists");
    User user = new User();
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setName(request.getName());
    user.setMobileNumber(request.getMobileNumber());
    user.setEmail(request.getEmail());
    user.setRole(Role.ROLE_USER);
    var savedUser = repository.save(user);
    String jwtToken = jwtService.generateToken(user);
    return new AuthenticationResponse(jwtToken);
  }
  public AuthenticationResponse register_admin(RegisterRequest request) {
    if(repository.existsByEmail(request.getEmail()))
      throw new ApiException("Email already exists");
    User user = new User();
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setName(request.getName());
    user.setMobileNumber(request.getMobileNumber());
    user.setEmail(request.getEmail());
    user.setRole(Role.ROLE_ADMIN);
    var savedUser = repository.save(user);

    String jwtToken = jwtService.generateToken(user);
    return new AuthenticationResponse(jwtToken);
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    try {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      request.getEmail(),
                      request.getPassword()
              )
      );
    }
    catch (BadCredentialsException e) {
      throw new ApiException("Invalid username or password !!");
    }

    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    return new AuthenticationResponse(jwtToken);
  }

//  private void saveUserToken(User user, String jwtToken) {
//    var token = Token.builder()
//        .user(user)
//        .token(jwtToken)
//        .tokenType(TokenType.BEARER)
//        .expired(false)
//        .revoked(false)
//        .build();
//    tokenRepository.save(token);
//  }

//  private void revokeAllUserTokens(User user) {
//    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
//    if (validUserTokens.isEmpty())
//      return;
//    validUserTokens.forEach(token -> {
//      token.setExpired(true);
//      token.setRevoked(true);
//    });
//    tokenRepository.saveAll(validUserTokens);
//  }
}
