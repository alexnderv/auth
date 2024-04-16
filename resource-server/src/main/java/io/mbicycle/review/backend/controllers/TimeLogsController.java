package io.mbicycle.review.backend.controllers;

import static java.util.Optional.ofNullable;

import java.util.List;

import io.mbicycle.review.backend.dto.TimeLogDto;
import io.mbicycle.review.backend.model.TimeLog;
import io.mbicycle.review.backend.model.User;
import io.mbicycle.review.backend.services.TimeLogService;
import io.mbicycle.review.backend.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/time-logs")
@RequiredArgsConstructor
public class TimeLogsController {

  private final TimeLogService timeLogService;
  private final UserService userService;
  private final ModelMapper mapper;

  @PostMapping
  public ResponseEntity<TimeLog> create(@RequestBody @Validated TimeLog timeLog) {
    return ResponseEntity.ok(timeLogService.create(timeLog));
  }

  @PutMapping
  public ResponseEntity<TimeLog> update(@RequestBody @Validated TimeLog timeLog) {
    return ResponseEntity.ok(timeLogService.update(timeLog));
  }

  @GetMapping("/{id}")
  public ResponseEntity<TimeLogDto> getSingle(@PathVariable Long id) {
    return timeLogService.getSingle(id)
        .map(t -> mapper.map(t, TimeLogDto.class))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.ok().build());
  }

  @GetMapping("/all")
  @RolesAllowed("ADMIN")
  public ResponseEntity<Page<TimeLogDto>> getAll(Pageable pageable) {
    Page<TimeLog> source = timeLogService.getPage(pageable);
    var typeToken = new TypeToken<Page<TimeLogDto>>() { };
    return ResponseEntity.ofNullable(mapper.map(source, typeToken.getType()));
  }

  @GetMapping("/some")
  public ResponseEntity<Page<TimeLogDto>> getSome(Pageable pageable) {

    User authenticatedUser = ofNullable(SecurityContextHolder.getContext())
        .map(SecurityContext::getAuthentication)
        .map(Authentication::getName)
        .flatMap(this.userService::getSingleByUsername)
        .orElseThrow(() -> new RuntimeException("Cannot find an authenticated user"));

    Page<TimeLog> source = timeLogService.getPageByUser(pageable, authenticatedUser);

    var typeToken = new TypeToken<Page<TimeLogDto>>() { };
    return ResponseEntity.ofNullable(mapper.map(source, typeToken.getType()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    // fixme check if user is an owner or admin
    timeLogService.getSingle(id)
        .ifPresentOrElse(
            timeLogService::delete,
            () -> {
              throw new RuntimeException("Nothing to remove");
            });
    return ResponseEntity.ok().build();
  }

  @DeleteMapping
  public ResponseEntity<Integer> deleteSome(@RequestBody List<Long> ids) {
    // fixme check if user is an owner or admin
    List<TimeLog> toDelete = timeLogService.getSome(ids);
    timeLogService.deleteSome(toDelete);
    return ResponseEntity.ok().build();
  }

}
