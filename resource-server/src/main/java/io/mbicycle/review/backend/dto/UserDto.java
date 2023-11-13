package io.mbicycle.review.backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
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
  @NotBlank(groups = UpdateUser.class)
  private Long id;
  @NotBlank(message = "The email is required", groups = CreateUser.class)
  @Length(min = 8, max = 100, groups = { CreateUser.class, UpdateUser.class, ResetPassword.class })
  private String email;
  @NotBlank(message = "The username is required", groups = CreateUser.class)
  @Length(min = 8, max = 100, groups = { CreateUser.class, UpdateUser.class })
  private String username;
  @NotBlank(message = "The first name is required", groups = CreateUser.class)
  @Length(min = 1, max = 100, message = "The first name must be between 1 and 100 length", groups = { CreateUser.class, UpdateUser.class })
  private String firstName;
  @NotBlank(message = "The last name is required", groups = CreateUser.class)
  @Length(min = 1, max = 100, message = "The last name must be between 1 and 100 length", groups = { CreateUser.class, UpdateUser.class })
  private String lastName;
  @Size(max = 20, groups = { CreateUser.class, UpdateUser.class })
  private List<String> phoneNumbers;

  public interface CreateUser {

  }

  public interface UpdateUser {

  }

  public interface ResetPassword {

  }

}
