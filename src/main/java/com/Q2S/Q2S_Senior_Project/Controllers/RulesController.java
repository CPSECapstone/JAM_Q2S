package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.Degree;
import com.Q2S.Q2S_Senior_Project.Models.Requirement;
import com.Q2S.Q2S_Senior_Project.Services.RulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class RulesController {

    private final RulesService rulesService;

    @Autowired
    public RulesController(RulesService rulesService) {
        this.rulesService = rulesService;
    }

    @RequestMapping(value = "/getCourseMapping", method = RequestMethod.GET, produces = "application/json")
    public CourseMapping getCourseMapping(@RequestParam(required = true) String courseID) {
        //if invalid courseID, mapping will return as null
        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);

        rulesService.mappingService(courseMapping);

        return courseMapping;
    }

    @RequestMapping(value = "/checkRequirement", method = RequestMethod.GET, produces = "application/json")
    public Degree checkRequirement(@RequestParam(required = true) List<String> courses) {
        Requirement r1 = new Requirement("CSC101 Requirement");
        Requirement r2 = new Requirement("Life Science Elective");
        Requirement r3 = new Requirement("Math Elective");
        List<Requirement> reqs = Arrays.asList(r1, r2, r3);
        Degree se = new Degree(reqs, "Software Engineering");
        se.setCourses(courses);

        for (Requirement req : se.getRequirements()) {
            rulesService.requirementService(req, se);
        }

        se.checkRequirementsMet();

        return se;
    }

}