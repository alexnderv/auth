package io.mbicycle.review.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:3000");
    configuration.addAllowedOrigin("http://localhost:3333");
    configuration.addAllowedOrigin("http://127.0.0.1:3000");
    configuration.addAllowedOrigin("http://127.0.0.1:3333");
    configuration.addAllowedOrigin("http://frontend:3000");
    configuration.addAllowedOrigin("http://frontend:3333");
    configuration.addAllowedHeader("*");
    configuration.addAllowedMethod("*");
    configuration.setAllowCredentials(true);
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
