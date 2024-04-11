package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplate;
import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateData;
import com.Q2S.Q2S_Senior_Project.Repositories.FlowchartTemplateRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
public class FlowchartTemplateController {

    private final FlowchartTemplateRepo flowchartTemplateRepo;

    FlowchartTemplateController(FlowchartTemplateRepo flowchartTemplateRepo){
        this.flowchartTemplateRepo = flowchartTemplateRepo;
    }

    /**
     * API to compile data of Poly Flow Builder's quarter flowchart templates and
     * input as rows into our database
     *
     * @return          the list of flowchart templates added to the database
     * @throws IOException  thrown on invalid file paths or by object mapper
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/FlowchartTemplates/fromScratch")
    List<FlowchartTemplate> updateFlowchartTemplates() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String templateDataFilePath = "data/2022-2026FlowTemplateData.json";
        File dataFile = new File(templateDataFilePath);
        List<FlowchartTemplateData> flowDataList = mapper.readValue(dataFile, new TypeReference<>(){});
        List<FlowchartTemplate> flowchartTemplateList = new ArrayList<>();
        File dir = new File("data/flows");
        File[] directoryListing = dir.listFiles();
        assert directoryListing != null;
        for (File child : directoryListing) {
            FlowchartTemplate template = getFlowchartTemplate(child, flowDataList);
            flowchartTemplateList.add(template);
        }

        flowchartTemplateRepo.saveAll(flowchartTemplateList);
        return flowchartTemplateList;
    }

    /**
     * Extracts the required data from the correct FlowChartTemplateData object
     * and prepares an Entity to be stored in the database
     *
     * @param child             the file of the flowchart template
     * @param flowDataList      list of all objects with flowchart data (Major Name,Concentration Name)
     * @return                  A FlowchartTemplate object ready to be put in the database
     * @throws IOException      Thrown in the event that there is no data for the child file
     */
    static FlowchartTemplate getFlowchartTemplate(File child, List<FlowchartTemplateData> flowDataList) throws IOException {
        String content = new String(Files.readAllBytes(child.toPath()));
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(content);
        String flowchartCode = jsonNode.get("name").asText();

        //Should only ever be one match
        List<FlowchartTemplateData> filteredFlowData = flowDataList.stream().filter((data) -> data.getCode().equals(flowchartCode)).toList();

        if (filteredFlowData.isEmpty()){
            throw new IOException("No Matching Major Data for File " + child.getPath());
        } else if (filteredFlowData.size() > 1){
            throw new IOException("Conflicting Major Data for File " + child.getPath());
        }
        FlowchartTemplateData data = filteredFlowData.get(0);
        FlowchartTemplate template = new FlowchartTemplate();
        template.setCatalog(data.getCatalog());
        template.setMajor(data.getMajorName());
        template.setConcentration(data.getConcName());
        template.setTermData(makeJsonFrontendCompatible(content));
        return template;
    }

    static String makeJsonFrontendCompatible(String originalFlowchart) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode coursesNode = objectMapper.readTree(originalFlowchart);
        JsonNode termData = coursesNode.get("termData");
        for(JsonNode term : termData){
            JsonNode classes = term.get("courses");
            for(JsonNode flowchartClass : classes){
                ((ObjectNode) flowchartClass).put("taken", false);
                UUID uuid = UUID.randomUUID();
                ((ObjectNode) flowchartClass).put("uuid", String.valueOf(uuid));
            }
        }
        return "{\"termData\":" + objectMapper.writeValueAsString(termData) + "}";
    }

    @PostMapping("/api/FlowchartTemplates")
    public FlowchartTemplate saveFlowchartTemplate(@Validated @RequestBody FlowchartTemplate flowchartTemplate) {
        return flowchartTemplateRepo.save(flowchartTemplate);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/FlowchartTemplates/{id}")
    FlowchartTemplate getFlowchartTemplateById(@PathVariable long id) {
        return flowchartTemplateRepo.findById(id).orElse(null);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/FlowchartTemplates")
    List<FlowchartTemplate> getAllFlowchartTemplates() {
        return flowchartTemplateRepo.findAll();
    }

    @DeleteMapping("/api/FlowchartTemplates")
    void deleteAllFlowchartTemplates(){
        flowchartTemplateRepo.deleteAll();
    }

}
