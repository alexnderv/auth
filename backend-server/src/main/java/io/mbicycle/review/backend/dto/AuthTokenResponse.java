package io.mbicycle.review.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthTokenResponse {

  private String accessToken;
  private String refreshToken;
  private String role;
  private int expiresIn;

}
