package com.mbicycle.review.authorizationserver.model;

import java.util.Set;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@SequenceGenerator(name = "user_details_seq", sequenceName = "user_details_seq", allocationSize = 1)
public class PersistentUserDetails implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_details_seq")
  private Long id;
  private String username;
  private String password;

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
