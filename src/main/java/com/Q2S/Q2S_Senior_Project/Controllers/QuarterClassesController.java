package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.QuarterClassModel;
import com.Q2S.Q2S_Senior_Project.Repositories.QuarterClassRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Controller class for managing quarter classes.
 */
@RestController
public class QuarterClassesController {
    private final QuarterClassRepo quarterClassRepo;

    /**
     * Constructor for QuarterClassesController.
     *
     * @param quarterClassRepo The QuarterClassRepo instance to use
     */
    QuarterClassesController(QuarterClassRepo quarterClassRepo) {
        this.quarterClassRepo = quarterClassRepo;
    }

    /**
     * Updates quarter classes from a JSON file.
     *
     * @return The list of updated QuarterClassModel objects
     * @throws IOException if an I/O error occurs while reading the JSON file
     */
    @PostMapping("/updateQuarterClasses")
    List<QuarterClassModel> updateQuarterClasses() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File("data/courses/2022-2026.json");

        List<QuarterClassModel> quarterClassList = mapper.readValue(file, new TypeReference<>(){});

        quarterClassRepo.saveAll(quarterClassList);
        return quarterClassList;
    }

    /**
     * Retrieves a quarter class by its ID.
     *
     * @param id The ID of the quarter class to retrieve
     * @return The QuarterClassModel object representing the quarter class
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/QuarterClass/{id}")
    QuarterClassModel getQuarterClassById(@PathVariable String id) {
        return quarterClassRepo.findById(id).orElse(null);
    }

    /**
     * Retrieves all quarter classes.
     *
     * @return The list of all QuarterClassModel objects
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllQuarterClasses")
    List<QuarterClassModel> getAllQuarterClasses() {
        return quarterClassRepo.findAll();
    }

}
