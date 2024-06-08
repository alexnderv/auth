package io.mbicycle.review.backend.controllers;

import static java.util.Optional.ofNullable;

import io.mbicycle.review.backend.dto.SalaryStatisticsDto;
import io.mbicycle.review.backend.model.User;
import io.mbicycle.review.backend.services.TimeLogService;
import io.mbicycle.review.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

  private final TimeLogService timeLogService;
  private final UserService userService;
  private final ModelMapper mapper;

  @GetMapping("/salary")
  @ResponseBody
  public SalaryStatisticsDto provideSalaryStatistics() {
    return ofNullable(SecurityContextHolder.getContext())
        .map(SecurityContext::getAuthentication)
        .map(Authentication::getName)
        .flatMap(this.userService::getSingleByUsername)
        .map(User::getId)
        .map(timeLogService::calculateSalaryThisMonth)
        .map(SalaryStatisticsDto::new)
        .orElseThrow(() -> new RuntimeException("Cannot find an authenticated user"));
  }

}
