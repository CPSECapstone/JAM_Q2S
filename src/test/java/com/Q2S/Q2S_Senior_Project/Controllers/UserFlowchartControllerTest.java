package com.Q2S.Q2S_Senior_Project.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static org.junit.jupiter.api.Assertions.*;

class UserFlowchartControllerTest {

    @Test
    void testIsQuarterTerm_Fall2026() {
        assertFalse(UserFlowchartController.isQuarterTerm(UserFlowchartController.TermSeason.Fall, 2026));
    }

    @Test
    void testIsQuarterTerm_Spring2026() {
        assertTrue(UserFlowchartController.isQuarterTerm(UserFlowchartController.TermSeason.Spring, 2026));
    }

    @Test
    void testIsQuarterTerm_Spring2027() {
        assertFalse(UserFlowchartController.isQuarterTerm(UserFlowchartController.TermSeason.Spring, 2027));
    }

    /**
     * Tests that the proper exception is thrown when the termAdmitted is not properly formatted
     * - Only one word
     */
    @Test
    void getValidatedTermAdmittedYearAndOrdinal_InvalidTermAdmitted_Length1() {
        Exception exception = assertThrows(IllegalStateException.class,
                () -> UserFlowchartController.getValidatedTermAdmittedYearAndOrdinal("2026"));

        String expectedMessage = "Term Admitted has an invalid format. Required: <Term> <Year>.";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    /**
     * Tests that the proper exception is thrown when the termAdmitted is not properly formatted
     * - More than two words
     */
    @Test
    void getValidatedTermAdmittedYearAndOrdinal_InvalidTermAdmitted_Length3() {
        Exception exception = assertThrows(IllegalStateException.class, () ->
            UserFlowchartController.getValidatedTermAdmittedYearAndOrdinal("Spring 2026 V2"));

        String expectedMessage = "Term Admitted has an invalid format. Required: <Term> <Year>.";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    /**
     * Tests that the proper exception is thrown when the termAdmitted is not properly formatted
     * - Invalid term season (Not winter, spring, summer, or fall)
     */
    @Test
    void getValidatedTermAdmittedYearAndOrdinal_InvalidTermAdmitted_InvalidSeason() {
        Exception exception = assertThrows(IllegalStateException.class, () ->
                UserFlowchartController.getValidatedTermAdmittedYearAndOrdinal("Unknown 2026"));

        String expectedMessage = "Term must be Winter, Spring, Summer, or Fall.Unexpected value";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    /**
     * Tests that the proper exception is thrown when the termAdmitted is not properly formatted
     * - Year not parseable into Int
     */
    @Test
    void getValidatedTermAdmittedYearAndOrdinal_InvalidYearAdmitted() {
        Exception exception = assertThrows(IllegalStateException.class, () ->
                UserFlowchartController.getValidatedTermAdmittedYearAndOrdinal("Spring 20v6"));

        String expectedMessage = "Term Admitted has an invalid year format. Required: <YYYY>.";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    /**
     * Tests that the proper exception is thrown when the flowchartTemplate is not properly formatted
     * - Invalid JSON format
     */
    @Test
    void createNewUserQuarterFlowchart_InvalidFlowchart_InvalidJSON() {
        Exception exception = assertThrows(IllegalStateException.class, () ->
                UserFlowchartController.createNewUserQuarterFlowchart("Spring 2026", "hello"));

        String expectedMessage = "Flowchart is in invalid JSON format.";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage,actualMessage);
    }

    /**
     * Tests that the proper exception is thrown when the flowchartTemplate is not properly formatted
     * - termData does not hold an array as expected
     */
    @Test
    void createNewUserQuarterFlowchart_InvalidFlowchart_InvalidTermData() {
        Exception exception = assertThrows(IllegalStateException.class, () ->
                UserFlowchartController.createNewUserQuarterFlowchart("Spring 2026", "{\"termData\": \"hello\"}"));

        String expectedMessage = "\"termData\" field is improperly formatted. It should be an array.";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage,actualMessage);
    }

    @Test
    void createNewUserQuarterFlowchart_Spring2026() throws IOException {
        File testJSONFile = new File("src/test/testJSONs/testFlowchart.json");
        String resultingFlowchart = UserFlowchartController.createNewUserQuarterFlowchart(
                "Spring 2026",
                new String(Files.readAllBytes(testJSONFile.toPath())));
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resultingFlowchart);
        JsonNode terms = jsonNode.get("termData");
        if (terms.isArray()){
            for (int i = 0; i < terms.size(); i++){
                JsonNode term = terms.get(i);
                String termType = term.get("termType").asText();
                String termName = term.get("termName").asText();
                switch (i) {
                    case 0:
                        assertEquals("Quarter", termType);
                        assertEquals("Winter 2026", termName);
                        break;
                    case 1:
                        assertEquals("Quarter", termType);
                        assertEquals("Spring 2026", termName);
                        break;
                    case 2:
                        assertEquals("Quarter", termType);
                        assertEquals("Summer 2026", termName);
                        break;
                    case 3:
                        assertEquals("Semester", termType);
                        assertEquals("Fall 2026", termName);
                        break;
                }
            }
        } else {
            throw new IllegalStateException("The \"termData\" field does not contain an array.");
        }
    }

    @Test
    void createNewUserQuarterFlowchart_Summer2026() throws IOException {
        File testJSONFile = new File("src/test/testJSONs/testFlowchart.json");
        String resultingFlowchart = UserFlowchartController.createNewUserQuarterFlowchart(
                "Summer 2026",
                new String(Files.readAllBytes(testJSONFile.toPath())));
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resultingFlowchart);
        JsonNode terms = jsonNode.get("termData");
        if (terms.isArray()){
            for (int i = 0; i < terms.size(); i++){
                JsonNode term = terms.get(i);
                String termType = term.get("termType").asText();
                String termName = term.get("termName").asText();
                switch (i) {
                    case 0:
                        assertEquals("Quarter", termType);
                        assertEquals("Spring 2026", termName);
                        break;
                    case 1:
                        assertEquals("Quarter", termType);
                        assertEquals("Summer 2026", termName);
                        break;
                    case 2:
                        assertEquals("Semester", termType);
                        assertEquals("Fall 2026", termName);
                        break;
                    case 3:
                        assertEquals("Semester", termType);
                        assertEquals("Spring 2027", termName);
                        break;
                }
            }
        } else {
            throw new IllegalStateException("The \"termData\" field does not contain an array.");
        }
    }

    @Test
    void createNewUserQuarterFlowchart_Fall2026() throws IOException {
        File testJSONFile = new File("src/test/testJSONs/testFlowchart.json");
        String resultingFlowchart = UserFlowchartController.createNewUserQuarterFlowchart(
                "Fall 2026",
                new String(Files.readAllBytes(testJSONFile.toPath())));
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resultingFlowchart);
        JsonNode terms = jsonNode.get("termData");
        if (terms.isArray()){
            for (int i = 0; i < terms.size(); i++){
                JsonNode term = terms.get(i);
                String termType = term.get("termType").asText();
                String termName = term.get("termName").asText();
                switch (i) {
                    case 0:
                        assertEquals("Quarter", termType);
                        assertEquals("Summer 2026", termName);
                        break;
                    case 1:
                        assertEquals("Semester", termType);
                        assertEquals("Fall 2026", termName);
                        break;
                    case 2:
                        assertEquals("Semester", termType);
                        assertEquals("Spring 2027", termName);
                        break;
                    case 3:
                        assertEquals("Semester", termType);
                        assertEquals("Summer 2027", termName);
                        break;
                }
            }
        } else {
            throw new IOException("The \"termData\" field does not contain an array.");
        }
    }
}