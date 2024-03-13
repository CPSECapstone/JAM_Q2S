package com.Q2S.Q2S_Senior_Project.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;

public class UserFlowchartController {

    private static final int SEMESTER_TRANSITION_YEAR = 2026;

    private static final String QUARTER_TAG = "Quarter";
    private static final String SEMESTER_TAG = "Semester";

    private static final int QUARTER_MOD_NUMBER = 4;
    private static final int SEMESTER_MOD_NUMBER = 3;

    // % 4 for Quarter, % 3 for Semester
    enum TermSeason {
        Spring,
        Summer,
        Fall,
        Winter
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
        ObjectMapper mapper = new ObjectMapper();
        int[] intInfo = getValidatedTermAdmittedYearAndOrdinal(termAdmitted);
        int year = intInfo[0];
        JsonNode rootNode = getValidatedFlowchartTemplateInfo(flowchartTemplate);
        ArrayNode terms = (ArrayNode) rootNode.get("termData");
        int termSeasonIterator = intInfo[1] -1; //iterate from one term before when the students started
        int offset = 0;
        String termType = QUARTER_TAG;
        int enumModNumber = QUARTER_MOD_NUMBER;
        int size = terms.size();
        for (int i = 0; i < size; i++) {
            int index = i + offset;
            TermSeason termSeason = TermSeason.values()[(enumModNumber + termSeasonIterator) % enumModNumber];
            // if this is the first instance of a semester term - change to semesters
            // should happen when Fall 2026 is reached
            if (termType.equals(QUARTER_TAG) && !isQuarterTerm(termSeason, year)){
                enumModNumber = SEMESTER_MOD_NUMBER;
                termType = SEMESTER_TAG;
            }
            ObjectNode node = (ObjectNode) terms.get(index);
            node.put("termName", termSeason.name() + " " + year);
            node.put("termType", termType);
            if (termSeason == TermSeason.Spring){
                index++;
                ObjectNode newObject = mapper.createObjectNode();
                newObject.put("termName", TermSeason.Summer + " " + year);
                newObject.put("termType", termType);
                newObject.put("courses", "[]");
                terms.insert(index,newObject);
                termSeasonIterator++;
                offset++;
            }
            if (termSeason == TermSeason.Fall){
                year++;
            }

            termSeasonIterator++;
        }

        String updatedJsonString = mapper.writeValueAsString(rootNode);
        System.out.println(updatedJsonString);
        return updatedJsonString;
    }

    static boolean isQuarterTerm(TermSeason season, int year){
        return year < SEMESTER_TRANSITION_YEAR || (year == SEMESTER_TRANSITION_YEAR & season != TermSeason.Fall);
    }

    /**
     * Validates that the term admitted data is of the correct format and
     * returns corresponding integer information
     *
     * @param termAdmitted  Term Admitted string
     * @return                   Array containing the integer values of the start year
     *                              and the starting ordinal for iterating
     */
    public static int[] getValidatedTermAdmittedYearAndOrdinal(String termAdmitted){
        String[] splitTermAdmitted = termAdmitted.split(" ");
        int admitYear;
        try {
            if (splitTermAdmitted.length != 2) {
                throw new IllegalStateException("Term Admitted has an invalid format. Required: <Term> <Year>. Given: " + termAdmitted);
            }
            admitYear = Integer.parseInt(splitTermAdmitted[1]);
        } catch (NumberFormatException e) {
            throw new IllegalStateException("Term Admitted has an invalid year format. Required: <YYYY>. Given: " + splitTermAdmitted[1]);
        }
        return new int[] {admitYear, getStartingOrdinal(splitTermAdmitted[0])};
    }

    /**
     *
     * @param flowchartTemplate   String of Flowchart template for major, concentration, and catalog chosen
     * @return                    Flowchart personalized to the termAdmitted submitted
     */
    private static JsonNode getValidatedFlowchartTemplateInfo(String flowchartTemplate){
        JsonNode rootNode;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            rootNode = objectMapper.readTree(flowchartTemplate);
            JsonNode terms = rootNode.get("termData");
            if (!terms.isArray()){
                throw new IllegalStateException("\"termData\" field is improperly formatted. It should be an array.");
            }
        } catch (JsonProcessingException e){
            throw new IllegalStateException("Flowchart is in invalid JSON format.");
        }
        return rootNode;
    }

    /**
     *
     * @param startQuarterTerm  - Quarter Term Season of Admit Term - Should be Winter, Spring, Summer, or Fall
     * @return  - the ordinal of the corresponding term Enum for iteration purposes
     */
    private static int getStartingOrdinal(String startQuarterTerm) {
        return switch (startQuarterTerm.toLowerCase()) {
            case "winter" -> TermSeason.Winter.ordinal();
            case "spring" -> TermSeason.Spring.ordinal();
            case "summer" -> TermSeason.Summer.ordinal();
            case "fall" -> TermSeason.Fall.ordinal();
            default -> throw new IllegalStateException("Term must be Winter, Spring, Summer, or Fall.Unexpected value: " + startQuarterTerm.toLowerCase());
        };
    }
}
