package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.User;
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

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Helper method to hash passwords using SHA-256
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

    @Transactional
    public boolean addUser(User user) {
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

    @Transactional
    public boolean authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        return user != null && hashPassword(password).equals(user.getPassword());
    }

    @Transactional
    public List<User> findAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Transactional
    public ResponseEntity<User> findUserById(@PathVariable(value = "id") long id) {
        Optional<User> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    @Transactional
    public boolean deleteUserById(long userId) {
        // Check if the user exists
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(userId);
            return true; // User deleted successfully
        } else {
            return false; // User with the given ID not found
        }
    }

}

