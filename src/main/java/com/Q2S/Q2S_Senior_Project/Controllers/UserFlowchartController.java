package com.Q2S.Q2S_Senior_Project.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class UserFlowchartController {

    private final int semesterTransitionYear = 2026;

    private enum QuarterTerms{
        Winter,
        Spring,
        Summer,
        Fall
    }

    private enum SemesterTerms{
        Spring,
        Summer,
        Fall
    }

    /**
     *
     *
     *
     * @param termAdmitted          Assumes the format "<Term> <Year>"
     * @param flowchartTemplate     JSON String of the appropriate template
     * @return   String of the template personalized to the user
     */
    static String createNewUserQuarterFlowchart(String termAdmitted, String flowchartTemplate) throws IOException {
        String[] admitTermAndYear;
        int admitYear;
        JsonNode terms;
        try {
            admitTermAndYear = termAdmitted.split(" ");
            if (admitTermAndYear.length != 2){
                throw new IOException("Term Admitted has an invalid format. Required: <Term> <Year>. Given: " + termAdmitted);
            }
            admitYear = Integer.parseInt(admitTermAndYear[1]);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(flowchartTemplate);
            terms = jsonNode.get("termData");
            System.out.println(terms);
        } catch (NumberFormatException e){
            throw new IOException("Term Admitted has an invalid year format - " + termAdmitted);
        } catch (JsonProcessingException e){
            throw new IOException("Flowchart is in invalid JSON format.");
        }

        return null;
    }
}
