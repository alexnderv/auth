package com.mbicycle.review.authorizationserver.services;

import static java.util.Optional.ofNullable;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RevokedTokenLogoutHandler implements LogoutHandler {

  private static final Logger logger = LoggerFactory.getLogger(RevokedTokenLogoutHandler.class);

  private final RevokedTokenService revokedTokenService;

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    ofNullable(request.getHeader("Authorization"))
        .ifPresentOrElse(
            revokedTokenService::add,
            () -> logger.info("Attempt to revoke token without Authorization header"));

  }
}
