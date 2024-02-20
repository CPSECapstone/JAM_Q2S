package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    public enum AdmitType{
        FIRST_YEAR_FRESHMAN,
        TRANSFER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String termAdmitted;
    @Enumerated(EnumType.STRING)
    private AdmitType admitType;
    private String catalogYear;
    private String major;
    private String concentration;
    private String minor;

    public User(){}
    public User (String userId, String firstName, String lastName, String email, String password){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
