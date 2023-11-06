package com.mbicycle.review.authorizationserver.controllers;

import com.mbicycle.review.authorizationserver.services.RevokedTokenService;
import io.swagger.v3.oas.annotations.headers.Header;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("/tokens")
public class TokenController {

  private final RevokedTokenService revokedTokenService;

  @PostMapping("/active")
  public ResponseEntity<Boolean> isTokenActive(@RequestHeader(name = "Authorization") String token) {
    return ResponseEntity.ok(!revokedTokenService.isTokenRevoked(token));
  }

}
