package io.mbicycle.review.backend.security;

import io.swagger.v3.oas.models.parameters.HeaderParameter;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder()
        .group("add-user-id-header")
        .addOperationCustomizer((operation, customizer) -> {
          operation.addParametersItem(
              new HeaderParameter()
                  .name("Authorization")
                  .description("Access Token")
                  .required(true)
          );
          return operation;
        })
        .build();
  }



}
