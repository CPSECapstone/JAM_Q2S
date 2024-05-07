package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.UserTermDataModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserTermDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling user term data-related endpoints.
 */
@Service
@RestController
public class UserTermDataController {

    @Autowired
    private UserTermDataRepo userTermDataRepo;

    /**
     * Saves user term data.
     *
     * @param userTermData The UserTermDataModel to save
     * @return The saved UserTermDataModel
     */
    @PostMapping("/api/UserTermData")
    public UserTermDataModel saveUserTermData(@Validated @RequestBody UserTermDataModel userTermData) {
        return userTermDataRepo.save(userTermData);
    }

    /**
     * Retrieves user term data by its ID.
     *
     * @param id The ID of the user term data
     * @return The UserTermDataModel with the specified ID, or null if not found
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/UserTermData/{id}")
    UserTermDataModel getUserTermDataById(@PathVariable long id) {
        return userTermDataRepo.findById(id).orElse(null);
    }

    /**
     * Retrieves all user term data.
     *
     * @return List of all UserTermDataModel objects
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/UserTermData")
    List<UserTermDataModel> getAllUserTermData() {
        return userTermDataRepo.findAll();
    }

    /**
     * Deletes user term data by its ID.
     *
     * @param id The ID of the user term data to delete
     */
    @DeleteMapping("/api/UserTermData/{id}")
    void deleteUserTermDataById(@PathVariable long id){
        userTermDataRepo.deleteById(id);
    }
}
