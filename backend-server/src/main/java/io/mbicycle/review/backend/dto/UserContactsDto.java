package io.mbicycle.review.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UserContactsDto {

  private String email;
  private String firstName;
  private String lastName;
  private List<String> phoneNumbers;

}
