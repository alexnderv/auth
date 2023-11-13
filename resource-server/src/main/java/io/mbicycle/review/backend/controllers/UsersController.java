package io.mbicycle.review.backend.controllers;

import java.util.List;

import io.mbicycle.review.backend.dto.PageDto;
import io.mbicycle.review.backend.dto.UserContactsDto;
import io.mbicycle.review.backend.dto.UserDto;
import io.mbicycle.review.backend.dto.UserSimpleDto;
import io.mbicycle.review.backend.model.User;
import io.mbicycle.review.backend.services.Sender;
import io.mbicycle.review.backend.services.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {

  private final UserService userService;
  private final Sender sender;
  private final ModelMapper mapper;

  @PostConstruct
  public void registerUserMappings() {

    Converter<String, String> toUpperCaseFirstLetter = ctx -> {
      String source = ctx.getSource();
      return source.substring(0, 1).toUpperCase() + source.substring(1);
    };

    mapper.createTypeMap(User.class, UserDto.class)
        .addMappings(m -> m.using(toUpperCaseFirstLetter).map(User::getFirstName, UserDto::setFirstName))
        .addMappings(m -> m.using(toUpperCaseFirstLetter).map(User::getLastName, UserDto::setLastName));

    Converter<String, String> toLowerCaseFirstLetter = ctx -> {
      String source = ctx.getSource();
      return source.substring(0, 1).toLowerCase() + source.substring(1);
    };

    mapper.createTypeMap(UserDto.class, User.class)
        .addMappings(m -> m.using(toLowerCaseFirstLetter).map(UserDto::getFirstName, User::setFirstName))
        .addMappings(m -> m.using(toLowerCaseFirstLetter).map(UserDto::getLastName, User::setLastName));
  }

  @Value("${default-admin.id}")
  private Long defaultUserId;

  @PostMapping("/fill-profile")
  public ResponseEntity<UserDto> create(@RequestBody @Validated(UserDto.CreateUser.class) UserDto dto) {
    User registered = userService.register(mapper.map(dto, User.class));
    return ResponseEntity.ok(mapper.map(registered, UserDto.class));
  }

  @GetMapping
  @RolesAllowed("ADMIN")
  public ResponseEntity<PageDto> getPage(Pageable pageRequest) {
    Page<User> users = userService.getPage(pageRequest);
    return ResponseEntity.ok(mapper.map(users, PageDto.class));
  }

  @RequestMapping("/search")
  @RolesAllowed("ADMIN")
  public ResponseEntity<List<UserSimpleDto>> getPage(@RequestParam("query") String query) {
    List<User> users = userService.queryUsers(query);
    TypeToken<List<UserSimpleDto>> typeToken = new TypeToken<>() {
    };
    return ResponseEntity.ok(mapper.map(users, typeToken.getType()));
  }

  @GetMapping("/me")
  public ResponseEntity<UserDto> getMe() {
    return userService.getSingleByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
        .map(u -> mapper.map(u, UserDto.class))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.badRequest().build());
  }

  @GetMapping("/admin")
  public ResponseEntity<UserContactsDto> getAdmin() {
    return userService.getSingle(defaultUserId)
        .map(u -> mapper.map(u, UserContactsDto.class))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.badRequest().build());
  }

  @GetMapping("{id}")
  @RolesAllowed("ADMIN")
  public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
    return userService.getSingle(id)
        .map(u -> mapper.map(u, UserDto.class))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.badRequest().build());
  }

  @PutMapping("{id}")
  @PreAuthorize("authentication.principal.username == #dto.username")
  public ResponseEntity<UserDto> update(@RequestBody @Validated(UserDto.UpdateUser.class) UserDto dto) {
    User updated = userService.register(mapper.map(dto, User.class));
    return ResponseEntity.ok(mapper.map(updated, UserDto.class));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<Object> resetPassword(@RequestBody @Validated(UserDto.ResetPassword.class) UserDto dto) {
    userService.loadUserByEmail(dto.getEmail())
        .map(User::getEmail)
        .ifPresentOrElse(
            sender::sendNewPassword,
            () -> {
              // fixme correct exception
              throw new RuntimeException("");
            }
        );

    return ResponseEntity.ok()
        .build();
  }

  @DeleteMapping("{id}")
  @RolesAllowed("ADMIN")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    // todo check if current user is not admin
    userService.getSingle(id)
        .ifPresentOrElse(
            u -> {
              // fixme think about transaction (introduce another one method? facade layer?)
              userService.delete(u);
              sender.notifyDeletedUser(u.getEmail());
            },
            () -> {
              // fixme correct exception
              throw new RuntimeException("");
            }
        );
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @DeleteMapping
  @RolesAllowed("ADMIN")
  public ResponseEntity<Integer> deleteSome(@RequestBody List<Long> ids) {
    // fixme check if there is an error while getting by wrong id
    List<User> toDelete = userService.getSomeById(ids);
    // todo check if there is no current user in a list
    userService.deleteSome(toDelete);
    toDelete.forEach(u -> sender.notifyDeletedUser(u.getEmail()));
    return ResponseEntity.ok(toDelete.size());
  }

}
