package com.mbicycle.review.authorizationserver.services;

import java.util.concurrent.TimeUnit;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RevokedTokenService {

  private final RedisTemplate<String, Object> redisTemplate;

  public boolean isTokenRevoked(String token) {
    return Boolean.TRUE.equals(redisTemplate.hasKey(token));
  }

  public void add(String toRevoke) {
    redisTemplate.opsForValue().set(toRevoke, new Object(), 30, TimeUnit.MINUTES);
  }
}
