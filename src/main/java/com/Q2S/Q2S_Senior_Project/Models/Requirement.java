package com.Q2S.Q2S_Senior_Project.Models;

import java.util.List;

public class Requirement {
    private String courses;
    private boolean met;
    private String which;

    public String getWhich() {
        return which;
    }

    public void setWhich(String which) {
        this.which = which;
    }

    public boolean isMet() {
        return met;
    }

    public void setMet(boolean met) {
        this.met = met;
    }

    public String getCourses() {
        return courses;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }
}
