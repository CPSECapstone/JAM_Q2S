package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name = "flowchartTemplate")
public class FlowchartTemplateModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String catalog;
    private String major;
    private String concentration;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;
}
