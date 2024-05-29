package com.Q2S.Q2S_Senior_Project.DataTransferObjects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewUserFlowchartDTO {
    private String flowchartName;
    private String catalogYear;
    private String Major;
    private String Concentration;
    //eventually term_admitted will be taken from the UserModelInfo
    private String term_admitted;
}
