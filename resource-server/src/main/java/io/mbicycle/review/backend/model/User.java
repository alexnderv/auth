package io.mbicycle.review.backend.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auth_user")
public class User {

  @Id
  private Long id;
  private String username;
  private String email;
  private String firstName;
  private String lastName;
  @ElementCollection
  @CollectionTable(name = "phone_number", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "number")
  private List<String> phoneNumbers;

}
