package io.mbicycle.review.backend;

import java.util.Set;

import io.mbicycle.review.backend.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "auth-server", url = "http://localhost:8081")
public interface AuthorizationServerClient {

  @PostMapping("/register")
  User register(@RequestBody User user);

  @DeleteMapping("/{id}")
  void delete(@PathVariable Long id, @RequestBody User user);

  @DeleteMapping("/some")
  void deleteSome(@RequestBody Set<User> users);

  @PostMapping("/tokens/active")
  ResponseEntity<Boolean> isTokenActive(@RequestHeader(name = "Authorization") String token);
}
