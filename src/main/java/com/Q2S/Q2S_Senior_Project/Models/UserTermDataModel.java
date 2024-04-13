package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name="UserTermData")
public class UserTermDataModel {
    @Id
    @Column(name = "userFlowchartId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;
}
