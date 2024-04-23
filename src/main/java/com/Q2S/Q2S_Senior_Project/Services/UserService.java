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

    @Transactional
    public boolean authenticateUser(String email, String password) {
        UserModel user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        return user != null && hashPassword(password).equals(user.getPassword());
    }

    @Transactional
    public List<UserModel> findAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        Optional<UserModel> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    @Transactional
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

    public static UserModel getUpdatedUser(UserModel user, UserModel updatedUser){
        //can update any field expect email and password which must be done with a distinct call
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

