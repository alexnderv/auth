package com.mbicycle.review.authorizationserver.configurations;


import java.time.Duration;
import java.util.UUID;

import com.mbicycle.review.authorizationserver.services.RevokedTokenLogoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
public class AuthorizationServerSecurityConfiguration {

  @Bean
  @Order(1)
  SecurityFilterChain configureServerDefaults(HttpSecurity http) throws Exception {
    OAuth2AuthorizationServerConfigurer authorizationServerConfigurer = new OAuth2AuthorizationServerConfigurer();
    RequestMatcher endpointsMatcher = authorizationServerConfigurer.getEndpointsMatcher();

    http
        .securityMatcher(endpointsMatcher)
        .authorizeHttpRequests(authorize ->
            authorize
                .requestMatchers("/token/status", "/logout").permitAll()
                .anyRequest().authenticated()
        )
        .csrf(csrf -> csrf.ignoringRequestMatchers(endpointsMatcher))
        .apply(authorizationServerConfigurer);

    http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
        .oidc(Customizer.withDefaults());

    http
        .exceptionHandling(exceptions ->
            exceptions
                .defaultAuthenticationEntryPointFor(
                    new LoginUrlAuthenticationEntryPoint("/login"),
                    new MediaTypeRequestMatcher(MediaType.TEXT_HTML)))
        .oauth2ResourceServer(resourceServer -> resourceServer.jwt(Customizer.withDefaults()));

    return http.build();
  }

  @Bean
  @Order(2)
  SecurityFilterChain configureLoginLogout(HttpSecurity http, RevokedTokenLogoutHandler handler) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .formLogin(Customizer.withDefaults())
        .logout(logout -> logout.logoutSuccessHandler(handler))
        .build();
  }

  @Bean
  RegisteredClientRepository configureDefaultClient(PasswordEncoder encoder) {
    RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
        .clientId("test-client")
        .clientSecret(encoder.encode("secret"))
        .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
        .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
        .tokenSettings(
            TokenSettings.builder()
                .accessTokenTimeToLive(Duration.ofMinutes(30))
                .refreshTokenTimeToLive(Duration.ofHours(24))
                .build())
        .redirectUri("http://localhost:8080/me")
        .scope("read")
        .scope("write")
        .build();
    return new InMemoryRegisteredClientRepository(registeredClient);
  }

}
