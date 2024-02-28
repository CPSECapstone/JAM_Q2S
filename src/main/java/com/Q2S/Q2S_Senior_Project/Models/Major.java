package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="Major")
public class Major {
    @Id
    private String major;
    private String catalog;
    private String units;
    private byte[] rulesBlob;
    @OneToMany
    private List<QuarterClass> majorClasses;
    @OneToMany
    private List<QuarterClass> supportClasses;
    @OneToMany
    private List<QuarterClass> concentrationClasses;
}