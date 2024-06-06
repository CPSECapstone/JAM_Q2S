package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.SemesterClassModel;
import com.Q2S.Q2S_Senior_Project.Repositories.SemesterClassRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for managing quarter classes.
 */
@RestController
public class SemesterClassesController {
    private final SemesterClassRepo semesterClassRepo;

    /**
     * Constructor for SemesterClassesController.
     *
     * @param semesterClassRepo The SemesterClassRepo instance to use
     */
    SemesterClassesController(SemesterClassRepo semesterClassRepo) {
        this.semesterClassRepo = semesterClassRepo;
    }

    /**
     * Get Course info by course id
     *
     * @param id    Course ID (ex: CSC1001)
     * @return      Corresponding course information or null if none exist
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/SemesterClass/{id}")
    SemesterClassModel getSemesterClassById(@PathVariable String id) {
        return semesterClassRepo.findById(id).orElse(null);
    }

    /**
     *
     * @return all semester course entries
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllSemesterClasses")
    List<SemesterClassModel> getAllSemesterClasses() {
        return semesterClassRepo.findAll();
    }

}

