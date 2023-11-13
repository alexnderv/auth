package io.mbicycle.review.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class BaseControllerAdvise {

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Void> handleRuntimeException(RuntimeException e) {
    log.error("Unexpected exception", e);
    return ResponseEntity.notFound().build();
  }

}
