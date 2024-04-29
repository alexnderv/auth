package com.mbicycle.review.authorizationserver.registration;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UserDto {
  @NotBlank(message = "The username is required")
  @Length(min = 8, max = 100)
  private String username;
  @NotBlank(message = "The password is required")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~`!@#$%^&*()_\\\\\\-+={}|:;\"'<,>.?/]).{8,100}$", message = "Not too strong password")
  private String password;
  private String role;

  private BigDecimal rate;
  private String photo;
  private Integer age;
  private String job;
  private String bio;
  private String country;
  private String city;
  private String quote;
}
