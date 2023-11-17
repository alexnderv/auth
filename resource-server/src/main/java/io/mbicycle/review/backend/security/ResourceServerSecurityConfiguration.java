package io.mbicycle.review.backend.security;

import static java.util.Optional.of;
import static java.util.Optional.ofNullable;

import io.mbicycle.review.backend.AuthorizationServerClient;
import io.mbicycle.review.backend.dto.AccessTokenStatusDto;
import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
    securedEnabled = true,
    jsr250Enabled = true)
@Slf4j
public class ResourceServerSecurityConfiguration {

  @Bean
  @Order(1)
  SecurityFilterChain configureEndpointsAccess(HttpSecurity http, @Qualifier("revokedTokenFilter") Filter revokedTokenFilter) throws Exception {

    return http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(a -> a.requestMatchers("/users/fill-profile").permitAll())
        .authorizeHttpRequests(a -> a.anyRequest().authenticated())
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
        .addFilterBefore(revokedTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  WebSecurityCustomizer webSecurityCustomizer() {
    return web -> web.ignoring()
        .requestMatchers(
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**");
  }

  @Bean
  @Qualifier("revokedTokenFilter")
  Filter revokedTokensFilter(AuthorizationServerClient client) {
    return (request, response, chain) -> {

      HttpServletRequest httpRequest = (HttpServletRequest) request;
      String authorizationHeader = httpRequest.getHeader("Authorization");

      ofNullable(authorizationHeader)
          .ifPresent(token -> {
            ResponseEntity<AccessTokenStatusDto> revokedTokenResponse = client.isTokenRevoked(authorizationHeader);
            ofNullable(revokedTokenResponse.getBody())
                .map(AccessTokenStatusDto::isRevoked)
                .ifPresent(isRevoked -> {
                  if (Boolean.TRUE.equals(isRevoked)) {
                    of(response)
                        .map(HttpServletResponse.class::cast)
                        .ifPresent(r -> r.setStatus(HttpStatus.UNAUTHORIZED.value()));
                  }
                });
          });

      chain.doFilter(request, response);
    };
  }

  @Bean
  JwtAuthenticationConverter customJwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
    grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

    JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    return jwtAuthenticationConverter;
  }


}
