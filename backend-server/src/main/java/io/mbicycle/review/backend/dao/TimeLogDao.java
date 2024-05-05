package io.mbicycle.review.backend.dao;

import io.mbicycle.review.backend.model.TimeLog;
import io.mbicycle.review.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeLogDao extends JpaRepository<TimeLog, Long> {

  Page<TimeLog> findAllByUser(Pageable pageRequest, User user);

}
