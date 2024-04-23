package com.Q2S.Q2S_Senior_Project.Controllers;


import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    UserController (UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserModel user) {
        if (userService.addUser(user)) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserModel user) {
        if (userService.authenticateUser(user.getEmail(), user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @GetMapping("/allUsers")
    public List<UserModel> findAllUsers() {
        return userService.findAllUsers();
    }

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