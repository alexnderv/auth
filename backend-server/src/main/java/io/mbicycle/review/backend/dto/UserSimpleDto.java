package io.mbicycle.review.backend.dto;

import lombok.Data;

@Data
public class UserSimpleDto {
  private Long id;
  private String email;
  private String firstName;
  private String lastName;
}
