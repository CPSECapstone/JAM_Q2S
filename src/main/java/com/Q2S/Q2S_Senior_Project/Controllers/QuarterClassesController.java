package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import com.Q2S.Q2S_Senior_Project.Models.SemesterClass;
import com.Q2S.Q2S_Senior_Project.Repositories.QuarterClassRepo;
import com.Q2S.Q2S_Senior_Project.Services.ClassConversionService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class QuarterClassesController {

    private final QuarterClassRepo quarterClassRepo;
    private final ClassConversionService classConversionService;

    QuarterClassesController(QuarterClassRepo quarterClassRepo, ClassConversionService classConversionService){
        this.quarterClassRepo = quarterClassRepo;
        this.classConversionService = classConversionService;
    }

    @PostMapping("/updateQuarterClasses")
    List<QuarterClass> updateQuarterClasses() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File file = new File("data/courses/2022-2026.json");
        List<QuarterClass> quarterClassList = mapper.readValue(file, new TypeReference<>(){});
        quarterClassRepo.saveAll(quarterClassList);
        return quarterClassList;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/QuarterClass/{id}")
    QuarterClass getQuarterClassById(@PathVariable String id) {
        return quarterClassRepo.findById(id).orElse(null);
    }


    @RequestMapping(value = "/mapQuarterToSemesterCourse", method = RequestMethod.GET, produces = "application/json")
    public List<SemesterClass> getMapping(@RequestParam(required = true) String classId, @RequestParam(required = true) String ruleName) {
        List<SemesterClass> semesterClasses = classConversionService.convertQuarterToSemester(classId, ruleName);
        return semesterClasses;
    }



}
