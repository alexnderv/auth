package com.mbicycle.review.authorizationserver.controllers;

import com.mbicycle.review.authorizationserver.dto.TokenStatusDto;
import com.mbicycle.review.authorizationserver.services.RevokedTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/token")
public class TokenController {

  private final RevokedTokenService revokedTokenService;

  @PostMapping("/status")
  public ResponseEntity<TokenStatusDto> isTokenActive(@RequestHeader(name = "Token") String token) {
    return ResponseEntity.ok(revokedTokenService.isTokenRevoked(token));
  }

}
