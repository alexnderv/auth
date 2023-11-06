package io.mbicycle.review.backend.services;

public interface Sender {
  void sendNewPassword(String address);

  void notifyDeletedUser(String address);
}
