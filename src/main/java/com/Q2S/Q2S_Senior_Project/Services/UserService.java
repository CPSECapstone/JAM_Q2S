package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing user-related operations.
 */
@Service
public class UserService {


    private final UserRepository userRepository;

    /**
     * Constructor for UserService.
     *
     * @param userRepository The UserRepository instance to use
     */
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Hashes the given password using SHA-256.
     *
     * @param password The password to hash
     * @return The hashed password
     */
    public String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());

            // Convert byte array to hexadecimal representation
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    /**
     * Registers a new user.
     *
     * @param user The user to register
     * @return true if the user is registered successfully, false otherwise
     */
    @Transactional
    public boolean addUser(UserModel user) {
        // Check if the email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return false; // User with this email already exists
        }

        // Hash the password before saving it
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        return true;
    }

    /**
     * Authenticates a user.
     *
     * @param email    The user's email
     * @param password The user's password
     * @return true if the user is authenticated, false otherwise
     */
    @Transactional
    public boolean authenticateUser(String email, String password) {
        Optional<UserModel> user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        return user.isPresent() && hashPassword(password).equals(user.get().getPassword());
    }

    /**
     * Retrieves all users.
     *
     * @return The list of all users
     */
    @Transactional
    public List<UserModel> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by ID.
     *
     * @param id The ID of the user to retrieve
     * @return The user with the specified ID, or null if not found
     */
    @Transactional
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        Optional<UserModel> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    /**
     * Retrieves a user by email.
     *
     * @param email The email of the user to retrieve
     * @return The user with the specified email, or null if not found
     */
    public Optional<UserModel> findUserModelById( long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public ResponseEntity<UserModel> findUserByEmail(@PathVariable(value = "email") String email) {
        Optional<UserModel> user = userRepository.findByEmail(email);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    /**
     * Deletes a user by ID.
     *
     * @param userId The ID of the user to delete
     * @return true if the user is deleted successfully, false otherwise
     */
    public boolean deleteUserById(long userId) {
        // Check if the user exists
        Optional<UserModel> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(userId);
            return true; // User deleted successfully
        } else {
            return false; // User with the given ID not found
        }
    }

    /**
     * Updates user information.
     *
     * @param id          The ID of the user to update
     * @param updatedUser The updated user information
     * @return true if the user information is updated successfully, false otherwise
     */
    public boolean updateUserInfo(long id, UserModel updatedUser) {
        // Retrieve the user entity by its ID
        UserModel user = userRepository.findById(id).orElse(null);
        if (user != null) {
            UserModel userV2 = UserService.getUpdatedUser(user, updatedUser);
            // Save the modified entity
            userRepository.save(userV2);
            return true;
        }
        return false;
    }

    /**
     * Updates a UserModel instance with the provided changes.
     *
     * @param user         The original UserModel instance
     * @param updatedUser  The UserModel instance with the updates
     * @return The updated UserModel instance
     */
    public static UserModel getUpdatedUser(UserModel user, UserModel updatedUser){
        //can update any field except email and password which must be done with a distinct call
        if (updatedUser.getUser_name() != null){
            user.setUser_name(updatedUser.getUser_name());
        }
        if (updatedUser.getFirst_name() != null){
            user.setFirst_name(updatedUser.getFirst_name());
        }
        if (updatedUser.getLast_name() != null){
            user.setLast_name(updatedUser.getLast_name());
        }
        if (updatedUser.getTerm_admitted() != null){
            user.setTerm_admitted(updatedUser.getTerm_admitted());
        }
        if (updatedUser.getAdmit_type() != null){
            user.setAdmit_type(updatedUser.getAdmit_type());
        }
        if (updatedUser.getCatalog_year() != null){
            user.setCatalog_year(updatedUser.getCatalog_year());
        }
        if (updatedUser.getMajor() != null){
            user.setMajor(updatedUser.getMajor());
        }
        if (updatedUser.getConcentration() != null){
            user.setConcentration(updatedUser.getConcentration());
        }
        if (updatedUser.getMinor() != null){
            user.setMinor(updatedUser.getMinor());
        }
        return user;
    }
}
