package io.mbicycle.review.backend.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailSender implements Sender {

  @Override
  public void sendNewPassword(String address) {
    // todo implement correctly
  }

  @Override
  public void notifyDeletedUser(String address) {
    // todo implement correctly
  }
}
