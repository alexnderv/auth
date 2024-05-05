package io.mbicycle.review.backend.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.SequenceGenerator;
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
@SequenceGenerator(name = "auth_user_id_seq", sequenceName = "auth_user_id_seq", allocationSize = 1)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "auth_user_id_seq")
  private Long id;
  private String username;
  private String password;
  private String email;
  private String firstName;
  private String lastName;
  private BigDecimal rate;
  private String photo;
  private Integer age;
  private String job;
  private String bio;
  private String country;
  private String city;
  private String quote;
  private String role;

  @ElementCollection
  @CollectionTable(name = "phone_number", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "number")
  private List<String> phoneNumbers;

}
