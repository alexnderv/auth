package io.mbicycle.review.backend.model;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import io.mbicycle.review.backend.services.UserRole;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auth_user")
@SequenceGenerator(name = "auth_user_id_seq", sequenceName = "auth_user_id_seq", allocationSize = 1)
public class User implements UserDetails {

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

  private Boolean enabled;
  private Boolean expired;
  private Boolean locked;
  private Boolean credentialsExpired;

  @ElementCollection
  @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "role")
  @Enumerated(EnumType.STRING)
  private Set<UserRole> authorities;

  @Override
  public Set<UserRole> getAuthorities() {
    return this.authorities;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return !this.expired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !this.locked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return !this.expired;
  }

  @Override
  public boolean isEnabled() {
    return this.enabled;
  }
}
