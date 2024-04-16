package com.Q2S.Q2S_Senior_Project.Models;

import java.util.List;

public class CourseMapping {

    private String startCourse;
    private List<String> mapping;

    public String getStartCourse() {
        return startCourse;
    }

    public void setStartCourse(String startCourse) {
        this.startCourse = startCourse;
    }

    public List<String> getMapping() {
        return mapping;
    }

    public void setMapping(List<String> mapping) {
        this.mapping = mapping;
    }
}