package io.mbicycle.review.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthTokenRequest {
  @NotBlank
  private String password;
  @NotBlank
  private String username;
}
