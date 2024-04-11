package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Services.CourseMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RulesController {

    private final CourseMappingService courseMappingService;

    @Autowired
    public RulesController(CourseMappingService courseMappingService) {
        this.courseMappingService = courseMappingService;
    }

    @RequestMapping(value = "/getMapping", method = RequestMethod.GET, produces = "application/json")
    public CourseMapping getQuestions(@RequestParam(required = true) String courseID) {

        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);

        courseMappingService.getCourseMapping(courseMapping);

        return courseMapping;
    }

}