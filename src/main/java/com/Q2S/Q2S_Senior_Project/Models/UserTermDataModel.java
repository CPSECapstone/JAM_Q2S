package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name = "userTermDataId")
    private long id;
    @JdbcTypeCode(SqlTypes.JSON)
    private String termData;
}
