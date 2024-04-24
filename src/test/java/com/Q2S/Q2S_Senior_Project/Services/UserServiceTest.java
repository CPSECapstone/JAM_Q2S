package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserRepository;
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

    @Test
    void getUpdatedUser_fromNullStartUser() {
        UserModel originalUserData = new UserModel();
        UserModel updatedUserData = new UserModel(1,"testUN", "testFName", "lastName","badEmail", "badPassword");
        UserModel actual = UserService.getUpdatedUser(originalUserData, updatedUserData);

        assertEquals(updatedUserData.getUser_name(), actual.getUser_name());
        assertEquals(updatedUserData.getFirst_name(), actual.getFirst_name());
        assertEquals(updatedUserData.getLast_name(), actual.getLast_name());
        assertEquals(updatedUserData.getUser_name(), actual.getUser_name());
        //id, password, and email should remain unchanged
        assertEquals(originalUserData.getId(), actual.getId());
        assertNull(actual.getEmail());
        assertNull(actual.getPassword());
    }

    @Test
    void getUpdatedUser_fromNullNewUser() {
        UserModel originalUserData = new UserModel(1,"testUN", "testFName", "lastName","badEmail", "badPassword");
        originalUserData.setMajor("testMajor");
        originalUserData.setMinor("testMinor");
        originalUserData.setConcentration("testConc");
        originalUserData.setCatalog_year("2022-2026");
        originalUserData.setTerm_admitted("test 2024");
        originalUserData.setAdmit_type(UserModel.AdmitType.FIRST_YEAR_FRESHMAN);

        UserModel updatedUserData = new UserModel();
        UserModel actual = UserService.getUpdatedUser(originalUserData, updatedUserData);

        //all fields should remain unchanged
        assertEquals(originalUserData.getId(), actual.getId());
        assertEquals(originalUserData.getUser_name(), actual.getUser_name());
        assertEquals(originalUserData.getFirst_name(), actual.getFirst_name());
        assertEquals(originalUserData.getLast_name(), actual.getLast_name());
        assertEquals(originalUserData.getUser_name(), actual.getUser_name());
        assertEquals(originalUserData.getEmail(), actual.getEmail());
        assertEquals(originalUserData.getPassword(), actual.getPassword());
        assertEquals(originalUserData.getMajor(), actual.getMajor());
        assertEquals(originalUserData.getMinor(), actual.getMinor());
        assertEquals(originalUserData.getConcentration(), actual.getConcentration());
        assertEquals(originalUserData.getCatalog_year(), actual.getCatalog_year());
        assertEquals(originalUserData.getTerm_admitted(), actual.getTerm_admitted());
        assertEquals(originalUserData.getAdmit_type(), actual.getAdmit_type());
    }

    @Test
    void getUpdatedUser_fromMixedNullInfo() {
        UserModel originalUserData = new UserModel(1,"testUN", "testFName", "lastName","badEmail", "badPassword");
        originalUserData.setMajor("testMajor");
        originalUserData.setMinor("testMinor");
        originalUserData.setConcentration("testConc");
        originalUserData.setCatalog_year("2022-2026");
        originalUserData.setTerm_admitted("test 2024");
        UserModel updatedUserData = new UserModel(1, "newUN", null, null, "newEmail", "newPassword");
        updatedUserData.setMajor("newMajor");
        //null minor
        updatedUserData.setConcentration("newConc");
        //null catalog
        //null termAdmitted
        UserModel actual = UserService.getUpdatedUser(originalUserData, updatedUserData);

        //userName, Major, and Concentration are changed
        assertEquals(updatedUserData.getUser_name(), actual.getUser_name());
        assertEquals(updatedUserData.getMajor(), actual.getMajor());
        assertEquals(updatedUserData.getConcentration(), actual.getConcentration());

        //all other fields should remain unchanged
        assertEquals(originalUserData.getId(), actual.getId());
        assertEquals(originalUserData.getFirst_name(), actual.getFirst_name());
        assertEquals(originalUserData.getLast_name(), actual.getLast_name());
        assertEquals(originalUserData.getUser_name(), actual.getUser_name());
        assertEquals(originalUserData.getEmail(), actual.getEmail());
        assertEquals(originalUserData.getPassword(), actual.getPassword());
        assertEquals(originalUserData.getMinor(), actual.getMinor());
        assertEquals(originalUserData.getCatalog_year(), actual.getCatalog_year());
        assertEquals(originalUserData.getTerm_admitted(), actual.getTerm_admitted());
        assertEquals(originalUserData.getAdmit_type(), actual.getAdmit_type());
    }


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
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        when(userRepository.save(any(UserModel.class))).thenReturn(new UserModel(1L, "testUser", "John", "Doe", "test@example.com", "hashedPassword"));

        UserModel user = new UserModel(1L, "testUser", "John", "Doe", "test@example.com", "password");

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

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new UserModel(1L, "testUser", "John", "Doe", "test@example.com", hashedPassword)));

        boolean result = userService.authenticateUser("test@example.com", password);

        assertTrue(result, "Authentication should be successful");
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testAuthenticateUserInvalidPassword() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new UserModel(1L, "testUser", "John", "Doe", "test@example.com", "differentHashedPassword")));

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