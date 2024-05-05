package io.mbicycle.review.backend.dao;

import java.util.Optional;

import io.mbicycle.review.backend.model.AuthSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthSourceDao extends JpaRepository<AuthSource, Long> {

  Optional<AuthSource> findByRefreshToken(String refreshToken);

  Optional<AuthSource> findByAccessToken(String accessToken);
}
