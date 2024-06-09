package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Services.CourseMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling course mapping-related endpoints.
 */
@RestController
@RequestMapping("/api")
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
     * Find the "Course Mapping" affiliated with a course ID
     *      Ex: The semester version of a quarter course
     *
     * @param courseID  Course ID (ex: CSC101)
     * @return      The corresponding course(s) of the opposite term type set in the "mapping" field
     *              "mapping" field left as null if there is no corresponding rule
     */
    @CrossOrigin(origins = {"http://localhost:3000", "http://q2s-poly-planner-pro-s3.s3-website-us-west-2.amazonaws.com"})
    @RequestMapping(value = "/course-mapping", method = RequestMethod.GET, produces = "application/json")
    public CourseMapping getCourseMapping(@RequestParam(required = true) String courseID) {
        //if invalid courseID, mapping will return as null
        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);

        courseMappingService.mappingService(courseMapping);

        return courseMapping;
    }

}