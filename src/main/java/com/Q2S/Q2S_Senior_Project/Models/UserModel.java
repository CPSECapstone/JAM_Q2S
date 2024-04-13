package com.Q2S.Q2S_Senior_Project.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@Table(name = "user")
public class UserModel {

    public enum AdmitType{
        FIRST_YEAR_FRESHMAN,
        TRANSFER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;
    private String user_name;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private String term_admitted;
    @Enumerated(EnumType.STRING)
    private AdmitType admit_type;
    private String catalog_year;
    private String major;
    private String concentration;
    private String minor;

    public UserModel(){}
    public UserModel(String userName, String firstName, String lastName, String email, String password){
        this.user_name = userName;
        this.first_name = firstName;
        this.last_name = lastName;
        this.email = email;
        this.password = password;
    }
}
