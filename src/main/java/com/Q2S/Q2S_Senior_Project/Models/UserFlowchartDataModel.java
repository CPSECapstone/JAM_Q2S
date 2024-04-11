package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Table(name="UserTermData")
public class UserFlowchartDataModel {
    @Id
    @Column(name = "userFlowchartId")
    private long id;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;
}
