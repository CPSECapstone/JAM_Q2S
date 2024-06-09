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
@RequestMapping("/api")
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
     * Parses the file from Poly Flow Builder with all 2022-2026 Quarter Classes
     * and input the information into the database
     *
     * @return      all parsed courses
     * @throws IOException   file contains invalid json
     */
    @PostMapping("/update-quarter-classes")
    List<QuarterClassModel> updateQuarterClasses() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File("data/courses/2022-2026.json");

        List<QuarterClassModel> quarterClassList = mapper.readValue(file, new TypeReference<>(){});

        quarterClassRepo.saveAll(quarterClassList);
        return quarterClassList;
    }

    /**
     * Get Course info by course id
     *
     * @param id    Course ID (ex: CSC101)
     * @return      Corresponding course information or null if none exist
     */
    @CrossOrigin(origins = {"http://localhost:3000", "http://q2s-poly-planner-pro-s3.s3-website-us-west-2.amazonaws.com"})
    @GetMapping("/quarter-classes/{id}")
    QuarterClassModel getQuarterClassById(@PathVariable String id) {
        return quarterClassRepo.findById(id).orElse(null);
    }

    /**
     *
     * @return all quarter course entries
     */
    @CrossOrigin(origins = {"http://localhost:3000", "http://q2s-poly-planner-pro-s3.s3-website-us-west-2.amazonaws.com"})
    @GetMapping("/quarter-classes")
    List<QuarterClassModel> getAllQuarterClasses() {
        return quarterClassRepo.findAll();
    }

}
