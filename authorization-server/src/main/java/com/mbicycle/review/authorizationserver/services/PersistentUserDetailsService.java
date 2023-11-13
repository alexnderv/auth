package com.mbicycle.review.authorizationserver.services;

import java.util.Collections;

import com.mbicycle.review.authorizationserver.dao.UserDetailsDao;
import com.mbicycle.review.authorizationserver.model.PersistentUserDetails;
import com.mbicycle.review.authorizationserver.model.UserRole;
import com.mbicycle.review.authorizationserver.registration.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersistentUserDetailsService implements UserDetailsService {

  private final UserDetailsDao dao;
  private final PasswordEncoder encoder;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return dao.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }

  public PersistentUserDetails createUser(UserDto source) {
    PersistentUserDetails target = PersistentUserDetails.builder()
        .username(source.getUsername())
        .password(encoder.encode(source.getPassword()))
        .authorities(Collections.singleton(UserRole.USER))
        .credentialsExpired(false)
        .expired(false)
        .enabled(true)
        .locked(false)
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
