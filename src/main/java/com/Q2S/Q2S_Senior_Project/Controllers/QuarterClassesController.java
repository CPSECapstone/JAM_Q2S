package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import com.Q2S.Q2S_Senior_Project.Models.RulesClass;
import com.Q2S.Q2S_Senior_Project.Repositories.QuarterClassRepo;
import com.Q2S.Q2S_Senior_Project.Services.ClassConversionService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class QuarterClassesController {
    @Autowired
    private ClassConversionService classConversionService;
    private final QuarterClassRepo quarterClassRepo;

    QuarterClassesController(QuarterClassRepo quarterClassRepo){
        this.quarterClassRepo = quarterClassRepo;
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

//1st try:
//    @RequestMapping(value = "/get-mapping", method = RequestMethod.GET, produces = "application/json")
//    public CourseMapping getMapping(@RequestParam(required = true) String classId) {
//        CourseMapping semesterClasses = classConversionService.getMapping(classId);
//        return semesterClasses;
//    }

//    //website: https://medium.com/javarevisited/spring-boot-drools-rule-engine-example-965eea437ee9
    @GetMapping("/get-course-mapping/{courseID}")
    public CourseMapping getMappingForClass(@PathVariable String courseID) {
        CourseMapping mapping = new CourseMapping(courseID);
        RulesClass course = new RulesClass(courseID);
        CourseMapping mapping2 = classConversionService.getMapping(course, mapping);
        System.out.println("AT THE END OF GETMAPPINGFORCLASS");
        return mapping2;
        //System.out.println("test test estetestes");
    }


}
