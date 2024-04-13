package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UserFlowcharts")
public class UserFlowchartModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name="userId")
    private UserModel user;
    private String catalogYear;
    private String Major;
    private String Concentration;
    private Boolean isMain;
    private Boolean isFavorite;
    @ManyToOne
    @JoinColumn(name="userFlowchartId")
    private UserTermDataModel termData;
}
