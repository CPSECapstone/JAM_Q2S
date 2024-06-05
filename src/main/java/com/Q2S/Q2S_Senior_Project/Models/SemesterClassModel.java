package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="SemesterClasses")
public class SemesterClassModel {
    @Id
    private String id;
    private String catalog;
    private String displayName;
    private String units;
    @Column(columnDefinition = "text")
    private String desc;
    @Column(columnDefinition = "text")
    private String addl;
    private Boolean gwrCourse;
    private Boolean uscpCourse;
}
