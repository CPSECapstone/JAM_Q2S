package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import com.Q2S.Q2S_Senior_Project.Repositories.QuarterClassRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
public class QuarterClassesController {

    private final QuarterClassRepo quarterClassRepo;

    QuarterClassesController(QuarterClassRepo quarterClassRepo) {
        this.quarterClassRepo = quarterClassRepo;
    }

    @PostMapping("/updateQuarterClasses")
    List<QuarterClass> updateQuarterClasses() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File("data/courses/2022-2026.json");
        List<QuarterClass> quarterClassList = mapper.readValue(file, new TypeReference<>() {
        });
        quarterClassRepo.saveAll(quarterClassList);
        return quarterClassList;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/QuarterClass/{id}")
    QuarterClass getQuarterClassById(@PathVariable String id) {
        return quarterClassRepo.findById(id).orElse(null);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllQuarterClasses")
    List<QuarterClass> getAllQuarterClasses() {
        return quarterClassRepo.findAll();
    }

}
