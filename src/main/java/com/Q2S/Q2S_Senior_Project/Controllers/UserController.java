package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
     * Register user api
     *
     * @param user  new user entity to be added (JSON format)
     * @return      ResponseEntity.ok if the action was successful
     *              ResponseEntity.badRequest() if the email conflicts with an existing user
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        if (userService.addUser(user)) {
            //Optional<UserModel> userWithId = userService.findUserByEmail(user.getEmail());
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }
    }

    /**
     * User Login
     *
     * @param user  User entity for attempted log in
     * @return      Response Entity with user entity successfully signed in OR
     *              ResponseEntity.badRequest() if log in unsuccessful
     */
    @CrossOrigin(origins = "*")
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
        try {
            if (!userService.authenticateMicrosoftUser(user)) {
                userService.addMicrosoftUser(user);
            }
            Optional<UserModel> loggedInUser = userService.findUserByEmail(user.getEmail());
            if (loggedInUser.isPresent()) {
                return ResponseEntity.ok(loggedInUser.get()); // Return user data upon successful login
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            Optional<UserModel> loggedInUser = userService.findUserByEmail(user.getEmail());
            if (loggedInUser.isPresent()) {
                return ResponseEntity.ok(loggedInUser.get()); // Return user data upon successful login
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        }
    }

    /**
     *
     * @return  list of all users
     */
    @GetMapping("/allUsers")
    public List<UserModel> findAllUsers() {
        return userService.findAllUsers();
    }

    /**
     * Update User Info (expect password and email)
     *
     * @param id    user id
     * @param updatedUser  user entity with potentially modified information
     * @return      ResponseEntity.ok if update was successful
     *              ResponseEntity.badRequest() if there is no associated user with the given id
     */
    @CrossOrigin(origins = "*")
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable(value = "id") long id,
                                                @RequestBody UserModel updatedUser) {
        if (userService.updateUserInfo(id, updatedUser)){
            return ResponseEntity.ok("User Update Successful");
        }
        return ResponseEntity.badRequest().body("Invalid User Id");
    }

    /**
     * Find User by ID
     *
     * @param id    user id (from database)
     * @return     Response Entity with the user affiliated with the id or
     *             ResponseEntity.notFound() if not found
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        return userService.findUserById(id);
    }
}