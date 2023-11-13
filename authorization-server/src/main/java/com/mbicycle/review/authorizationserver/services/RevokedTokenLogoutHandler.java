package com.mbicycle.review.authorizationserver.services;

import static java.util.Optional.ofNullable;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RevokedTokenLogoutHandler implements LogoutSuccessHandler {

  private final RevokedTokenService revokedTokenService;

  @Override
  public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    log.debug("Logout triggered");
    ofNullable(request.getHeader("Authorization"))
        .ifPresentOrElse(
            revokedTokenService::add,
            () -> log.info("Attempt to revoke token without Authorization header"));

  }
}
