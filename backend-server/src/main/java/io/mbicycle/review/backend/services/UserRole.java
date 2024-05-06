package io.mbicycle.review.backend.services;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
  USER, ADMIN;

  @Override
  public String getAuthority() {
    return this.name();
  }
}
