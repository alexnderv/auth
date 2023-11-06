package com.mbicycle.review.authorizationserver.controllers;

import com.mbicycle.review.authorizationserver.model.PersistentUserDetails;
import com.mbicycle.review.authorizationserver.registration.UserDto;
import com.mbicycle.review.authorizationserver.services.PersistentUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/users")
@RequiredArgsConstructor
public class UsersController {

  private final PersistentUserDetailsService userDetailsService;

  @PostMapping("/register")
  public ResponseEntity<PersistentUserDetails> register(@RequestBody UserDto dto) {
    return ResponseEntity.ok(userDetailsService.createUser(dto));
  }

  @PutMapping("/update")
  // fixme add security
  public ResponseEntity<PersistentUserDetails> update(@RequestBody UserDto dto) {
    return ResponseEntity.ok(userDetailsService.updateUser(dto));
  }

}
