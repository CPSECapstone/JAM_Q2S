package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    UserController (UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<UserModel> findAllUsers() {
        return (List<UserModel>) userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        Optional<UserModel> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
            );
    }

    @PostMapping
    public UserModel saveUser(@Validated @RequestBody UserModel user) {
        return userRepository.save(user);
    }
}