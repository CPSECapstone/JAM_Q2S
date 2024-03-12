package com.Q2S.Q2S_Senior_Project.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class UserFlowchartControllerTest {

    @Test
    void createNewUserQuarterFlowchart() throws IOException {
        UserFlowchartController.createNewUserQuarterFlowchart("Spring 2026", "{\"termData\": \"hello\"}");
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
            throw new IOException("The \"termData\" field does not contain an array.");
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
                        assertEquals("Spring 2026", termName);
                        break;
                }
            }
        } else {
            throw new IOException("The \"termData\" field does not contain an array.");
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
                        assertEquals("Spring 2026", termName);
                        break;
                    case 3:
                        assertEquals("Semester", termType);
                        assertEquals("Summer 2026", termName);
                        break;
                }
            }
        } else {
            throw new IOException("The \"termData\" field does not contain an array.");
        }
    }

    @Test
    void createNewUserQuarterFlowchart_Spring2027() throws IOException {
        File testJSONFile = new File("src/test/testJSONs/testFlowchart.json");
        String resultingFlowchart = UserFlowchartController.createNewUserQuarterFlowchart(
                "Spring 2027",
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
                        assertEquals("Semester", termType);
                        assertEquals("Fall 2026", termName);
                        break;
                    case 1:
                        assertEquals("Semester", termType);
                        assertEquals("Spring 2027", termName);
                        break;
                    case 2:
                        assertEquals("Semester", termType);
                        assertEquals("Summer 2027", termName);
                        break;
                    case 3:
                        assertEquals("Semester", termType);
                        assertEquals("Fall 2027", termName);
                        break;
                }
            }
        } else {
            throw new IOException("The \"termData\" field does not contain an array.");
        }
    }
}