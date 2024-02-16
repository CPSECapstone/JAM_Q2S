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
    private long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String termAdmitted;
    @Enumerated(EnumType.STRING)
    private AdmitType admitType;
    private String catalogYear;
    private String major;
    private String concentration;

    public User(){}
    public User (String firstName, String lastName, String userName, String email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
    }
}
