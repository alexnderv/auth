package com.mbicycle.review.authorizationserver.services;

import java.util.concurrent.TimeUnit;

import com.mbicycle.review.authorizationserver.dto.TokenStatusDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RevokedTokenService {

  private final RedisTemplate<String, String> redisTemplate;

  public TokenStatusDto isTokenRevoked(String token) {
    boolean revoked = Boolean.TRUE.equals(redisTemplate.hasKey(token));
    return new TokenStatusDto(revoked);
  }

  public void add(String toRevoke) {
    redisTemplate.opsForValue().set(toRevoke, "", 30, TimeUnit.MINUTES);
  }
}
