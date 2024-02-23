package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplate;
import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateData;
import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import com.Q2S.Q2S_Senior_Project.Repositories.FlowchartTemplateRepo;
import com.Q2S.Q2S_Senior_Project.Repositories.QuarterClassRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@RestController
public class FlowchartTemplateController {

    private final FlowchartTemplateRepo flowchartTemplateRepo;

    FlowchartTemplateController(FlowchartTemplateRepo flowchartTemplateRepo){
        this.flowchartTemplateRepo = flowchartTemplateRepo;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/FlowchartTemplates/fromScratch")
    List<FlowchartTemplate> updateFlowchartTemplates() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File dataFile = new File("data/2022-2026FlowTemplateData.json");
        List<FlowchartTemplateData> flowDataList = mapper.readValue(dataFile, new TypeReference<>(){});

        List<FlowchartTemplate> flowchartTemplateList = new ArrayList<>();
        File dir = new File("data/flows");
        File[] directoryListing = dir.listFiles();
        assert directoryListing != null;
        for (File child : directoryListing) {
            String content = new String(Files.readAllBytes(child.toPath()));
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(content);
            String flowchartCode = jsonNode.get("name").asText();

            //Should only ever be one match
            List<FlowchartTemplateData> filteredFlowData = flowDataList.stream().filter((data) -> data.getCode().equals(flowchartCode)).toList();
            FlowchartTemplate template = getFlowchartTemplate(child, filteredFlowData, content);

            flowchartTemplateList.add(template);
        }

        flowchartTemplateRepo.saveAll(flowchartTemplateList);
        return flowchartTemplateList;
    }

    /**
     * Extracts the required data from the correct FlowChartTemplateData object
     * and prepares an Entity to be stored in the database
     *
     * @param child         the file of the flowchart template
     * @param filteredFlowData      list of data store objects whose codes match that in the child file
     *                              -- should only be one
     * @param content       the contents of the flowchart template file
     * @return              A FlowchartTemplate object ready to be put in the database
     * @throws IOException  Thrown in the event that there is no data for the child file
     */
    private static FlowchartTemplate getFlowchartTemplate(File child, List<FlowchartTemplateData> filteredFlowData, String content) throws IOException {
        if (filteredFlowData.isEmpty()){
            throw new IOException("No Matching Major Data for File " + child.getPath());
        }
        FlowchartTemplateData data = filteredFlowData.get(0);
        FlowchartTemplate template = new FlowchartTemplate();
        template.setId(data.getId());
        template.setCatalog(data.getCatalog());
        template.setMajor(data.getMajorName());
        template.setConcentration(data.getConcName());
        template.setFlowchart(content);
        return template;
    }

    @GetMapping("/FlowchartTemplates/{id}")
    FlowchartTemplate getFlowchartTemplateById(@PathVariable String id) {
        return flowchartTemplateRepo.findById(id).orElse(null);
    }


    @GetMapping("/FlowchartTemplates")
    List<FlowchartTemplate> getAllFlowchartTemplates() {
        return flowchartTemplateRepo.findAll();
    }

    @DeleteMapping("/FlowchartTemplates")
    void deleteAllFlowchartTemplates(){
        flowchartTemplateRepo.deleteAll();
    }



}
