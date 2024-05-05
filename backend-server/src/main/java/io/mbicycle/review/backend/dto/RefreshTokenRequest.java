package io.mbicycle.review.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
  @NotBlank
  private String refreshToken;
}
