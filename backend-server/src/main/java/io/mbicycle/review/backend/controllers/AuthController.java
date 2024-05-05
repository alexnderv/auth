package io.mbicycle.review.backend.controllers;

import java.time.Instant;

import io.mbicycle.review.backend.dto.AuthTokenRequest;
import io.mbicycle.review.backend.dto.AuthTokenResponse;
import io.mbicycle.review.backend.dto.RefreshTokenRequest;
import io.mbicycle.review.backend.model.AuthSource;
import io.mbicycle.review.backend.services.AuthSourceService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final ModelMapper mapper;
  private final AuthSourceService authSourceService;

  @PostConstruct
  public void registerUserMappings() {

    Converter<Instant, Integer> instantIntegerConverter = ctx ->
        Math.toIntExact(ctx.getSource().toEpochMilli() - Instant.now().toEpochMilli());

    mapper.createTypeMap(AuthSource.class, AuthTokenResponse.class)
        .addMappings(m -> m.using(instantIntegerConverter).map(AuthSource::getExpiresAt, AuthTokenResponse::setExpiresIn))
        .addMappings(m -> m.map(source -> source.getAuthenticatedUser().getRole(), AuthTokenResponse::setRole));
  }

  @PostMapping("/token")
  @ResponseBody
  public AuthTokenResponse getAccessToken(@RequestBody @Validated AuthTokenRequest request) {
    AuthSource authSource = authSourceService.authenticate(request.getUsername(), request.getPassword());
    return mapper.map(authSource, AuthTokenResponse.class);
  }

  @PostMapping("/refresh")
  @ResponseBody
  public AuthTokenResponse refreshToken(@RequestBody @Validated RefreshTokenRequest request) {
    AuthSource authSource = authSourceService.refreshAccessToken(request.getRefreshToken());
    return mapper.map(authSource, AuthTokenResponse.class);
  }

  @PostMapping("/logout")
  @ResponseBody
  public Void logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
    authSourceService.logout(accessToken);
    return null;
  }
}
