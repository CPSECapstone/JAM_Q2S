package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.Degree;
import com.Q2S.Q2S_Senior_Project.Models.Requirement;
import com.Q2S.Q2S_Senior_Project.Services.RulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Controller class for handling course mapping-related endpoints.
 */

@RestController
public class RulesController {

    private final RulesService rulesService;

    /**
     * Constructor for RulesController.
     *
     * @param rulesService The CourseMappingService instance to use
     */
    @Autowired
    public RulesController(RulesService rulesService) {
        this.rulesService = rulesService;
    }

    /**
     * Find the "Course Mapping" affiliated with a course ID
     *      Ex: The semester version of a quarter course
     *
     * @param courseID  Course ID (ex: CSC101)
     * @return      The corresponding course(s) of the opposite term type set in the "mapping" field
     *              "mapping" field left as null if there is no corresponding rule
     */
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
        ArrayList<Requirement> requirements = new ArrayList<>(Arrays.asList(
                new Requirement("CSC/CPE101 Requirement"),
                new Requirement("CSC/CPE202 Requirement"),
                new Requirement("CSC/CPE123 Requirement"),
                new Requirement("CSC/CPE203 Requirement"),
                new Requirement("CSC225 Requirement"),
                new Requirement("CSC248 Requirement"),
//                new Requirement("CSC300 or PHIL323 Requirement"),
                new Requirement("CSC305 Requirement"),
                new Requirement("CSC308 Requirement"),
                new Requirement("CSC309 Requirement"),
                new Requirement("CSC349 Requirement"),
                new Requirement("CSC/CPE357 Requirement"),
                new Requirement("CSC365 Requirement"),
                new Requirement("CSC402 Requirement"),
                new Requirement("CSC405 Requirement"),
                new Requirement("CSC406 Requirement"),
                new Requirement("CSC430 Requirement"),
                new Requirement("CSC484 Requirement"),
//                new Requirement("Technical Elective"),
//                new Requirement("IME314 or IME315 Requirement"),
                new Requirement("MATH141 Requirement"),
                new Requirement("MATH142 Requirement"),
                new Requirement("MATH143 Requirement"),
                new Requirement("MATH241 Requirement")
//                new Requirement("MATH244 Requirement"),
//                new Requirement("PHIL230 or PHIL231 Requirement")
//                new Requirement("PSY201/202 Requirement"),
//                new Requirement("PSY350 or COMS217 Requirement"),
//                new Requirement("STAT312 Requirement")
//                new Requirement("Life Science Support Elective"),
//                new Requirement("Mathematics Support Elective"),
//                new Requirement("Physical Science Support Elective"),
//                new Requirement("GE Area A1 Requirement"),
//                new Requirement("GE Area A2 Requirement"),
//                new Requirement("GE Area A3 Requirement"),
//                new Requirement("GE Area C1 Requirement"),
//                new Requirement("GE Lower-Div C Elective Requirement"),
//                new Requirement("GE Upper-Division C Requirement"),
//                new Requirement("GE Area D1 Requirement"),
//                new Requirement("GE Area D Elective Requirement"),
//                new Requirement("GE Area F Requirement")
        ));
        Degree se = new Degree(requirements, "Software Engineering");
        se.setCourses(courses);

        for (Requirement req : se.getRequirements()) {
            rulesService.requirementService(req, se);
        }

        se.checkRequirementsMet();
        return se;
    }
}