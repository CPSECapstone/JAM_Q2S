package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Getter
@Setter
@Entity
@Table(name = "UserFlowcharts")
public class UserFlowchartModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;

    /*userModel info is not fetched*/
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    /*flowchart data will be deleted when its associated user is deleted*/
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserModel userId;
    private String catalogYear;
    private String Major;
    private String Concentration;
    private boolean isMain;
    private boolean isFavorite;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;

}

