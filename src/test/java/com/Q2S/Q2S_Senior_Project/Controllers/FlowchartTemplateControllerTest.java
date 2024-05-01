package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateModel;
import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateDataModel;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class FlowchartTemplateControllerTest {


    /**
     *  Tests that the correct information is stored in the resulting FlowchartTemplate object
     *  when there exists a valid matching FlowchartTemplateData object
     */
    @Test
    void testGetFlowchartTemplate_ValidMatch() throws IOException {
        File CS_GeneralFlowchartFile = new File("src/test/testJSONs/testFlowchartTemplate.json");
        FlowchartTemplateDataModel CS_Data = new FlowchartTemplateDataModel();
        CS_Data.setCatalog("Catalog");
        CS_Data.setCode("Test Code");
        CS_Data.setConcName("Example Concentration");
        CS_Data.setMajorName("Major");
        List<FlowchartTemplateDataModel> flowDataList = new ArrayList<>(List.of(CS_Data));
        FlowchartTemplateModel testData = FlowchartTemplateController.getFlowchartTemplate(CS_GeneralFlowchartFile, flowDataList);
        assertEquals("Catalog", testData.getCatalog());
        assertEquals("Major", testData.getMajor());
        assertEquals("Example Concentration", testData.getConcentration());
        String fileContent = new String(Files.readAllBytes(CS_GeneralFlowchartFile.toPath()));
        ObjectMapper mapper = new ObjectMapper();
        JsonNode expectedJson = mapper.readTree(fileContent).get("termData");
        JsonNode actualJson = mapper.readTree(testData.getTermData());
        assertEquals(expectedJson, actualJson);
    }

    /**
     *  Tests that the correct exception is thrown when there is no matching
     *  Flowchart template data
     */
    @Test
    void testGetFlowchartTemplate_InvalidMatch() throws IOException {
        File CS_GeneralFlowchartFile = new File("src/test/testJSONs/testFlowchartTemplate.json");
        List<FlowchartTemplateDataModel> flowDataList = new ArrayList<>();
        Exception exception = assertThrows(IOException.class, () -> {
            FlowchartTemplateController.getFlowchartTemplate(CS_GeneralFlowchartFile, flowDataList);
        });

        String expectedMessage = "No Matching Major Data for File ";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    /**
     *  Tests that the correct exception is thrown when there are multiple matching
     *  Flowchart template data, which should not happen
     */
    @Test
    void testGetFlowchartTemplate_ConflictingMatch() throws IOException {
        File CS_GeneralFlowchartFile = new File("src/test/testJSONs/testFlowchartTemplate.json");
        FlowchartTemplateDataModel data1 = new FlowchartTemplateDataModel();
        data1.setCode("Test Code");
        FlowchartTemplateDataModel data2_conflicting = new FlowchartTemplateDataModel();
        data2_conflicting.setCode("Test Code");
        List<FlowchartTemplateDataModel> flowDataList = new ArrayList<>(List.of(data1, data2_conflicting));
        Exception exception = assertThrows(IOException.class, () -> {
            FlowchartTemplateController.getFlowchartTemplate(CS_GeneralFlowchartFile, flowDataList);
        });

        String expectedMessage = "Conflicting Major Data for File ";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}