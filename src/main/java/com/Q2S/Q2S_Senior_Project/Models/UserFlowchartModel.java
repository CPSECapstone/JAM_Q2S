package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name = "UserFlowcharts")
public class UserFlowchartModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToOne//TODO: Figure out lazy loading
    @JoinColumn(name="userId")
    private UserModel user;
    private String catalogYear;
    private String Major;
    private String Concentration;
    private boolean isMain;
    private boolean isFavorite;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;
}
