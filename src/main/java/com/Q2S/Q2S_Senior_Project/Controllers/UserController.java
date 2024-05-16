package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling user-related endpoints.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {


    private final UserService userService;

    @Autowired
    UserController (UserService userService){
    /**
     * Constructor for UserController.
     *
     * @param userService The UserService to be injected.
     */
    public UserController(UserService userService){
        this.userService = userService;
    }

    /**
     * Endpoint for registering a new user.
     *
     * @param user The UserModel representing the user to register.
     * @return ResponseEntity indicating success or failure of user registration.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserModel user) {
        if (userService.addUser(user)) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }
    }

    /**
     * Endpoint for user login.
     *
     * @param user The UserModel representing the user attempting to login.
     * @return ResponseEntity with user data upon successful login, or error message.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserModel user) {
        if (userService.authenticateUser(user.getEmail(), user.getPassword())) {
            ResponseEntity<UserModel> loggedInUser = userService.findUserByEmail(user.getEmail());
            if (loggedInUser != null) {
                return ResponseEntity.ok(loggedInUser); // Return user data upon successful login
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    /**
     * Endpoint for retrieving all users.
     *
     * @return List of UserModel representing all users.
     */
    @GetMapping("/allUsers")
    public List<UserModel> findAllUsers() {
        return userService.findAllUsers();
    }

    /**
     * Endpoint for updating user information.
     *
     * @param id ID of the user to update.
     * @param updatedUser The updated UserModel.
     * @return ResponseEntity indicating success or failure of user update.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable(value = "id") long id,
                                                @RequestBody UserModel updatedUser) {
        if (userService.updateUserInfo(id, updatedUser)){
            return ResponseEntity.ok("User Update Successful");
        }
        return ResponseEntity.badRequest().body("Invalid User Id");
    }

    /**
     * Endpoint for retrieving a user by ID.
     *
     * @param id The ID of the user to retrieve.
     * @return ResponseEntity with UserModel if found, or error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        return userService.findUserById(id);
    }
}
