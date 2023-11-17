package io.mbicycle.review.backend;

import io.mbicycle.review.backend.dto.AccessTokenStatusDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "auth-server", url = "http://auth-server:8081")
public interface AuthorizationServerClient {

  @PostMapping("/token/status")
  ResponseEntity<AccessTokenStatusDto> isTokenRevoked(@RequestHeader(name = "Token") String token);
}
