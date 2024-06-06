package com.Q2S.Q2S_Senior_Project.Models;

import java.util.List;

public class Requirement {
    private boolean met;
    private String name;

    public Requirement(String name) {
        this.name = name;
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
}
