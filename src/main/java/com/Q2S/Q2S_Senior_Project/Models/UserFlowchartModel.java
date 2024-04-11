package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Table(name = "UserFlowcharts")
public class UserFlowchartModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String name;
    @ManyToOne
    @JoinColumn(name="userId")
    private long userId;
    private String catalogYear;
    private String Major;
    private String Concentration;
    private String isMain;
    private String isFavorite;
    @ManyToOne
    @JoinColumn(name="userFlowchartId")
    private long termDataId;
}
