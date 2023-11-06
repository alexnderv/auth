package com.mbicycle.review.authorizationserver.registration;

import lombok.Data;

@Data
public class UserDto {
  private String username;
  private String password;
  private String role;
}
