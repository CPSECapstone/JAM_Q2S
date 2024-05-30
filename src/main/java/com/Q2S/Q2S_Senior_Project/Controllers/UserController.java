package com.Q2S.Q2S_Senior_Project.Controllers;


import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    UserController (UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        if (userService.addUser(user)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserModel user) {
        if (userService.authenticateUser(user.getEmail(), user.getPassword())) {
            Optional<UserModel> loggedInUser = userService.findUserByEmail(user.getEmail());
            if (loggedInUser.isPresent()) {
                return ResponseEntity.ok(loggedInUser.get()); // Return user data upon successful login
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/loginMicrosoftUser")
    public ResponseEntity<?> loginMicrosoftUser(@RequestBody UserModel user) {
        if (!userService.authenticateMicrosoftUser(user)) {
            userService.addMicrosoftUser(user);
        }
        Optional<UserModel> loggedInUser = userService.findUserByEmail(user.getEmail());
        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get()); // Return user data upon successful login
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @GetMapping("/allUsers")
    public List<UserModel> findAllUsers() {
        return userService.findAllUsers();
    }

    @CrossOrigin(origins = "*")
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable(value = "id") long id,
                                                @RequestBody UserModel updatedUser) {
        if (userService.updateUserInfo(id, updatedUser)){
            return ResponseEntity.ok("User Update Successful");
        }
        return ResponseEntity.badRequest().body("Invalid User Id");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        return userService.findUserById(id);
    }
}