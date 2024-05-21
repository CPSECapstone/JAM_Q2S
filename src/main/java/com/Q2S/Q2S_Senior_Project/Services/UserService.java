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

    /**
     * Helper method to hash passwords using SHA-256
     *
     * @param password  Un-encoded password from user input
     * @return      hashed/encoded password string
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
     * Add User to Database
     *
     * @param user  user entity to be added
     * @return  true if user was added successfully
     *          false otherwise (user email already exists)
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
     * Authenticate user login
     *
     * @param email     email for user login
     * @param password      password for user login
     * @return      true if the login credentials pass,
     *              false otherwise
     */
    @Transactional
    public boolean authenticateUser(String email, String password) {
        Optional<UserModel> user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        return user.isPresent() && hashPassword(password).equals(user.get().getPassword());
    }

    /**
     * Get All Users
     *
     * @return  list of all user entities
     */
    @Transactional
    public List<UserModel> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Find User by ID
     *
     * @param id     id of desired user
     * @return     ResponseEntity with desired user entity if found,
     *             ResponseEntity.notFound() otherwise
     */
    @Transactional
    public ResponseEntity<UserModel> findUserById(@PathVariable(value = "id") long id) {
        Optional<UserModel> user = userRepository.findById(id);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    public Optional<UserModel> findUserModelById( long id) {
        return userRepository.findById(id);
    }

    /**
     * Find User by Email
     *
     * @param email     email of desired user
     * @return     ResponseEntity with desired user entity if found,
     *             ResponseEntity.notFound() otherwise
     */
    @Transactional
    public ResponseEntity<UserModel> findUserByEmail(@PathVariable(value = "email") String email) {
        Optional<UserModel> user = userRepository.findByEmail(email);

        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    /**
     * Delete User By ID
     *
     * @param userId    id of user to be deleted
     * @return true if operation successful, false otherwise
     */
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

    /**
     * Update the fields of user with id '{id}' to match fields of updatedUser
     *      except email and password
     *
     * @param id    user id
     * @param updatedUser  user entity with modified fields
     * @return  true if operation successful, false otherwise
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
     * Update user entity fields except email and password
     *
     * @param user      original user entity
     * @param updatedUser   user entity with modified fields
     * @return      original user entity with fields changed to match the modified fields of
     *              the updated user
     */
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

