package com.Q2S.Q2S_Senior_Project;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserRepository;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        userService = new UserService(userRepository);
    }

    @Test
    void testAddUser() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        when(userRepository.save(any(UserModel.class))).thenReturn(new UserModel("testUser", "John", "Doe", "test@example.com", "hashedPassword"));

        UserModel user = new UserModel("testUser", "John", "Doe", "test@example.com", "password");

        boolean result = userService.addUser(user);

        assertTrue(result, "User should be added successfully");
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testAddUserEmailTaken() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new UserModel()));

        UserModel user = new UserModel();
        user.setEmail("test@example.com");
        user.setPassword("password");

        boolean result = userService.addUser(user);

        assertFalse(result, "User with the same email already exists");
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(userRepository, never()).save(any(UserModel.class));
    }

    @Test
    void testAuthenticateUser() {
        String password = "password";
        String hashedPassword = userService.hashPassword(password);

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new UserModel("testUser", "John", "Doe", "test@example.com", hashedPassword)));

        boolean result = userService.authenticateUser("test@example.com", password);

        assertTrue(result, "Authentication should be successful");
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testAuthenticateUserInvalidPassword() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new UserModel("testUser", "John", "Doe", "test@example.com", "differentHashedPassword")));

        boolean result = userService.authenticateUser("test@example.com", "password");

        assertFalse(result, "Authentication should fail due to an invalid password");
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testFindUserById() {
        long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(new UserModel()));

        var result = userService.findUserById(userId);

        verify(userRepository, times(1)).findById(userId);
        assertTrue(result.getStatusCode().is2xxSuccessful());
    }

    @Test
    void testFindUserByIdNotFound() {
        long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        var result = userService.findUserById(userId);

        verify(userRepository, times(1)).findById(userId);
        assertTrue(result.getStatusCode().is4xxClientError());
    }
}
