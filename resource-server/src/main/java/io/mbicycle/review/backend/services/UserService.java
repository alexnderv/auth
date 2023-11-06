package io.mbicycle.review.backend.services;

import java.util.List;
import java.util.Optional;

import io.mbicycle.review.backend.AuthorizationServerClient;
import io.mbicycle.review.backend.dao.UserDao;
import io.mbicycle.review.backend.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

  private final UserDao dao;
  private final AuthorizationServerClient authorizationServerClient;

  @Transactional
  public User register(User source) {
    // fixme use access token
    authorizationServerClient.register(source);
    return dao.save(source);
  }

  public Optional<User> getSingle(Long id) {
    return dao.findById(id);
  }

  public List<User> getSomeById(List<Long> ids) {
    return dao.findAllById(ids);
  }

  public Page<User> getPage(PageRequest pageRequest) {
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
}
