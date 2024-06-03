package io.mbicycle.review.backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalaryStatisticsDto {

  private BigDecimal salary;

}
