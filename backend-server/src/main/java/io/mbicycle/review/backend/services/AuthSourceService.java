package io.mbicycle.review.backend.services;

import java.time.Instant;
import java.util.UUID;

import io.mbicycle.review.backend.dao.AuthSourceDao;
import io.mbicycle.review.backend.model.AuthSource;
import io.mbicycle.review.backend.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthSourceService {

  private final AuthSourceDao dao;
  private final UserService userService;
  private final PasswordEncoder encoder;

  public AuthSource authenticate(String username, String password) {

    User user = userService.getSingleByCredentials(username, encoder.encode(password))
        .orElseThrow();

    return dao.save(
        AuthSource.builder()
            .authenticatedUser(user)
            .accessToken(UUID.randomUUID().toString())
            .refreshToken(UUID.randomUUID().toString())
            .expiresAt(Instant.now().plusSeconds(3600))
            .build());
  }

  @Transactional
  public AuthSource refreshAccessToken(String refreshToken) {

    AuthSource expired = dao.findByRefreshToken(refreshToken)
        .orElseThrow();

    AuthSource refreshed = AuthSource.builder()
        .authenticatedUser(expired.getAuthenticatedUser())
        .accessToken(UUID.randomUUID().toString())
        .refreshToken(UUID.randomUUID().toString())
        .expiresAt(Instant.now())
        .build();

    return dao.save(refreshed);
  }

  public boolean isAuthenticated(String accessToken) {
    return dao.findByAccessToken(accessToken)
        .filter(a -> Instant.now().isBefore(a.getExpiresAt()))
        .isPresent();
  }

  public void logout(String accessToken) {
    dao.findByAccessToken(accessToken)
        .ifPresent(dao::delete);
  }

}
