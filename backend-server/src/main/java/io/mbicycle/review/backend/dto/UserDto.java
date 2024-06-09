package io.mbicycle.review.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  @NotNull(groups = UpdateUser.class)
  private Long id;
  @NotBlank(message = "The email is required", groups = CreateUser.class)
  @Length(min = 8, max = 100, groups = { CreateUser.class, UpdateUser.class, ResetPassword.class })
  private String email;
  @NotBlank(message = "The username is required", groups = CreateUser.class)
  @Length(min = 8, max = 100, groups = { CreateUser.class, UpdateUser.class })
  private String username;
  private String password;
  @NotBlank(message = "The first name is required", groups = CreateUser.class)
  @Length(min = 1, max = 100, message = "The first name must be between 1 and 100 length", groups = { CreateUser.class, UpdateUser.class })
  private String firstName;
  @NotBlank(message = "The last name is required", groups = CreateUser.class)
  @Length(min = 1, max = 100, message = "The last name must be between 1 and 100 length", groups = { CreateUser.class, UpdateUser.class })
  private String lastName;
  private String phoneNumber;

  private BigDecimal rate;
  private String photo;
  private Integer age;
  private String job;
  private String bio;
  private String country;
  private String city;
  private String quote;

  private BigDecimal salary;
  private Integer timeCountHours;

  private Set<String> authorities;

  public interface CreateUser {

  }

  public interface UpdateUser {

  }

  public interface ResetPassword {

  }

}
