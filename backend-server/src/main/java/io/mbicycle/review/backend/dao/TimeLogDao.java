package io.mbicycle.review.backend.dao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import io.mbicycle.review.backend.model.TimeLog;
import io.mbicycle.review.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeLogDao extends JpaRepository<TimeLog, Long> {

  Page<TimeLog> findAllByUser(Pageable pageRequest, User user);

  @Query("SELECT u.rate * t.timeCountHours "
      + "FROM TimeLog t "
      + "JOIN t.user u "
      + "WHERE u.id = :userId AND t.updatedAt BETWEEN :startDate AND :endDate")
  List<BigDecimal> getUserSalary(Long userId, LocalDate startDate, LocalDate endDate);


  @Query("SELECT t.timeCountHours "
      + "FROM TimeLog t "
      + "JOIN t.user u "
      + "WHERE u.id = :userId AND t.updatedAt BETWEEN :startDate AND :endDate")
  List<Integer> getHoursByUserId(Long userId, LocalDate startDate, LocalDate endDate);

}
