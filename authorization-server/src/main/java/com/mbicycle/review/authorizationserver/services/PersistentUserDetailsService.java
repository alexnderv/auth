package com.mbicycle.review.authorizationserver.services;

import java.util.Collections;

import com.mbicycle.review.authorizationserver.dao.UserDetailsDao;
import com.mbicycle.review.authorizationserver.model.UserRole;
import com.mbicycle.review.authorizationserver.model.PersistentUserDetails;
import com.mbicycle.review.authorizationserver.registration.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersistentUserDetailsService implements UserDetailsService {

  private final UserDetailsDao dao;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return dao.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }

  public PersistentUserDetails createUser(UserDto source) {
    PersistentUserDetails target = PersistentUserDetails.builder()
        .username(source.getUsername())
        .password(source.getPassword())
        .authorities(Collections.singleton(UserRole.USER))
        .build();
    return dao.save(target);
  }

  public PersistentUserDetails updateUser(UserDto source) {
    PersistentUserDetails target = dao.findByUsername(source.getUsername())
        .orElseThrow(() -> new UsernameNotFoundException(source.getUsername()));

    target.setPassword(source.getPassword());

    return dao.save(target);
  }

}
