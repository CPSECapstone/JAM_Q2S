package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.dialect.PostgreSQLJsonPGObjectJsonbType;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name = "2022-2026flowchartTemplate")
public class FlowchartTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String catalog;
    private String major;
    private String concentration;
    @Column(columnDefinition = "jsonb")
    private String flowchart;
}
