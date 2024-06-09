package io.mbicycle.review.backend.exceptions;

import static java.util.Optional.ofNullable;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class BaseControllerAdvise {

  private final static Map<String, ErrorRow> errorMappings = Map.of(
      "auth_user_email_key", new ErrorRow("email", "already exists"),
      "auth_user_username_key", new ErrorRow("username", "already exists")
  );

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Void> handleRuntimeException(RuntimeException e) {
    log.error("Unexpected exception", e);
    return ResponseEntity.internalServerError().build();
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Void> handleAccessDeniedException(AccessDeniedException ex) {
    log.error("Unauthorized access attempt");
    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Set<ErrorRow> result = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(e -> new ErrorRow(e.getField(), StringUtils.defaultIfBlank(e.getDefaultMessage(), "")))
        .collect(Collectors.toSet());

    return ResponseEntity.badRequest().body(result);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<?> handleConstraintViolation(DataIntegrityViolationException ex) {
    return ofNullable(ex.getCause())
        .filter(ConstraintViolationException.class::isInstance)
        .map(ConstraintViolationException.class::cast)
        .map(ConstraintViolationException::getConstraintName)
        .map(errorMappings::get)
        .map(ResponseEntity.badRequest()::body)
        .orElse(ResponseEntity.internalServerError().build());
  }

  @Data
  @AllArgsConstructor
  private static class ErrorRow {
    private String field;
    private String message;
  }

}
