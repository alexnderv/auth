package com.mbicycle.review.authorizationserver.dao;

import java.util.Optional;

import com.mbicycle.review.authorizationserver.model.PersistentUserDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsDao extends CrudRepository<PersistentUserDetails, Long> {

  @Query("select u from PersistentUserDetails u join fetch u.authorities where u.username = :username")
  Optional<PersistentUserDetails> findByUsername(String username);

}
