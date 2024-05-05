package io.mbicycle.review.backend.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "auth_source")
@SequenceGenerator(name = "auth_source_id_seq", sequenceName = "auth_source_id_seq", allocationSize = 1)
public class AuthSource {

  @Id
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User authenticatedUser;
  private String accessToken;
  private String refreshToken;
  private Instant expiresAt;

}
