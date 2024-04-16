package io.mbicycle.review.backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import io.mbicycle.review.backend.dao.TimeLogDao;
import io.mbicycle.review.backend.dto.SalaryStatisticsDto;
import io.mbicycle.review.backend.model.TimeLog;
import io.mbicycle.review.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TimeLogService {

  private final TimeLogDao dao;

  public TimeLog create(TimeLog timeLog) {
    return dao.save(timeLog);
  }

  public TimeLog update(TimeLog timeLog) {
    return dao.save(timeLog);
  }

  public Optional<TimeLog> getSingle(Long id) {
    return dao.findById(id);
  }

  public Page<TimeLog> getPageByUser(Pageable pageRequest, User user) {
    return dao.findAllByUser(pageRequest, user);
  }

  public Page<TimeLog> getPage(Pageable pageRequest) {
    return dao.findAll(pageRequest);
  }

  public List<TimeLog> getSome(List<Long> ids) {
    return dao.findAllById(ids);
  }

  public void delete(TimeLog toDelete) {
    dao.delete(toDelete);
  }

  public void deleteSome(List<TimeLog> toDelete) {
    dao.deleteAll(toDelete);
  }

  public SalaryStatisticsDto calculateSalaryForPeriod(LocalDate from, LocalDate to, User user) {
    // fixme create world's best sql query to get statistics
    return null;
  }
}
