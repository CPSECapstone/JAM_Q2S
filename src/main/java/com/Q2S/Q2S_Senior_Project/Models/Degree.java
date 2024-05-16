package com.Q2S.Q2S_Senior_Project.Models;
import com.Q2S.Q2S_Senior_Project.Models.Requirement;

import java.util.ArrayList;
import java.util.List;

public class Degree {
    private List<Requirement> requirements;
    private boolean met;
    private String name;
    private List<String> courses;

    public Degree(List<Requirement> requirements, String name) {
        this.requirements = requirements;
        this.name = name;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isMet() {
        return met;
    }

    public void setMet(boolean met) {
        this.met = met;
    }

    public List<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<Requirement> requirements) {
        this.requirements = requirements;
    }

    public void insertRequirement(Requirement requirement){
        this.requirements.add(requirement);
    }

    public List<String> getUnmetRequirements() {
        List<String> unmetRequirements = new ArrayList<>();
        for (Requirement req : requirements) {
            if (!req.isMet()) {
                unmetRequirements.add(req.getName());
            }
        }
        return unmetRequirements;
    }

    public void checkRequirementsMet() {
        boolean allRequirementsMet = true;
        for (Requirement req : requirements) {
            if (!req.isMet()) {
                allRequirementsMet = false;
                break;
            }
        }
        this.met = allRequirementsMet;
    }


}
