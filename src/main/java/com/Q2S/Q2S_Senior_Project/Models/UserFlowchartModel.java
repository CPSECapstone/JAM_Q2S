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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private UserModel userId;
    private String catalogYear;
    private String Major;
    private String Concentration;
    private boolean isMain;
    private boolean isFavorite;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userFlowchartId")
    private UserTermDataModel termDataId;
}
