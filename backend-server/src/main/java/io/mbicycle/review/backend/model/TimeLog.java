package io.mbicycle.review.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "time_log")
@SequenceGenerator(name = "time_log_id_seq", sequenceName = "time_log_id_seq", allocationSize = 1)
public class TimeLog {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "time_log_id_seq")
  private Long id;
  private Long timeCountHours;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDate updatedAt;

}
