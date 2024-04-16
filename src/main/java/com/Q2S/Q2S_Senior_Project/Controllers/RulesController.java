package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.Requirement;
import com.Q2S.Q2S_Senior_Project.Services.RulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);

        rulesService.mappingService(courseMapping);

        return courseMapping;
    }

    @RequestMapping(value = "/checkRequirement", method = RequestMethod.GET, produces = "application/json")
    public Requirement checkRequirement(@RequestParam(required = true) String courses) {

        Requirement requirement = new Requirement();
        requirement.setCourses(courses);

        rulesService.requirementService(requirement);

        return requirement;
    }

}