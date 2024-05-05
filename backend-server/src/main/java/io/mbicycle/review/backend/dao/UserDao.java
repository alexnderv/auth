package io.mbicycle.review.backend.dao;

import java.util.List;
import java.util.Optional;

import io.mbicycle.review.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

  @Query("SELECT u FROM User u LEFT JOIN FETCH u.phoneNumbers WHERE u.email = :email")
  Optional<User> findByEmail(String email);

  Optional<User> findByUsername(String username);

  @Query("SELECT u FROM User u "
      + "WHERE u.firstName LIKE lower(concat('%',:someName,'%')) "
      + "OR u.lastName LIKE lower(concat('%',:someName,'%'))")
  List<User> findAllByNames(String someName);

}
