package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Services.ClassConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public class RulesController {
    private final ClassConversionService classConversionService;

    @Autowired
    public RulesController(ClassConversionService classConversionService){
        this.classConversionService = classConversionService;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/getMapping", method = RequestMethod.GET, produces = "application/json")
    public CourseMapping getMapping(@RequestParam(required = true) String courseID) {
        CourseMapping courseMapping = new CourseMapping();
        courseMapping.setStartCourse(courseID);
        classConversionService.getCourseMapping(courseMapping);
        return courseMapping;
    }
}
