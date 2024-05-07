package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Services.CourseMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling course mapping-related endpoints.
 */
@RestController
public class RulesController {

    private final CourseMappingService courseMappingService;

    /**
     * Constructor for RulesController.
     *
     * @param courseMappingService The CourseMappingService instance to use
     */
    @Autowired
    public RulesController(CourseMappingService courseMappingService) {
        this.courseMappingService = courseMappingService;
    }

    /**
     * Retrieves the course mapping for the specified course ID.
     *
     * @param courseID The ID of the course to get the mapping for
     * @return The CourseMapping object representing the mapping for the course
     */
    @RequestMapping(value = "/getCourseMapping", method = RequestMethod.GET, produces = "application/json")
    public CourseMapping getCourseMapping(@RequestParam(required = true) String courseID) {
        //if invalid courseID, mapping will return as null
        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);

        courseMappingService.mappingService(courseMapping);

        return courseMapping;
    }

}
