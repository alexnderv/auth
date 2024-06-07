package io.mbicycle.review.backend.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import io.mbicycle.review.backend.dao.UserDao;
import io.mbicycle.review.backend.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

  private final UserDao dao;

  @Transactional
  public User register(User source) {
    source.setEnabled(true);
    source.setExpired(false);
    source.setCredentialsExpired(false);
    source.setLocked(false);
    source.setAuthorities(Collections.singleton(UserRole.USER));
    return dao.save(source);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return dao.findByUsername(username)
        .map(u -> {
          u.setAuthorities(Collections.singleton(UserRole.valueOf(u.getCareerRole())));
          return u;
        })
        .orElseThrow();
  }

  public Optional<User> getSingle(Long id) {
    return dao.findById(id);
  }

  public Optional<User> getSingleByUsername(String username) {
    return dao.findByUsername(username);
  }

  public List<User> getSomeById(List<Long> ids) {
    return dao.findAllById(ids);
  }

  public Page<User> getPage(Pageable pageRequest) {
    return dao.findAll(pageRequest);
  }

  public Optional<User> loadUserByEmail(String email) {
    return dao.findByEmail(email);
  }

  public void delete(User user) {
    dao.delete(user);
  }

  public void deleteSome(List<User> users) {
    dao.deleteAll(users);
  }

  public List<User> queryUsers(String query) {
    return dao.findAllByNames(query.toLowerCase());
  }

}
