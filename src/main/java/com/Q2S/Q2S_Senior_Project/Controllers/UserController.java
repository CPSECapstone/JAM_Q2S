package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.User;
import com.Q2S.Q2S_Senior_Project.Models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> findAllUsers() {
        // Implement
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable(value = "id") long id) {
        Optional<User> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
            );
    }

    @PostMapping
    public User saveUser(@Validated @RequestBody User user) {
        // Implement
        return null;
    }
}