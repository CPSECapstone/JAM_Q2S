package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateModel;
import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateDataModel;
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
    List<FlowchartTemplateModel> updateFlowchartTemplates() throws IOException {

        flowchartTemplateRepo.deleteByCatalog("2022-2026");

        ObjectMapper mapper = new ObjectMapper();
        String templateDataFilePath = "data/2022-2026FlowTemplateData.json";
        File dataFile = new File(templateDataFilePath);
        List<FlowchartTemplateDataModel> flowDataList = mapper.readValue(dataFile, new TypeReference<>(){});
        List<FlowchartTemplateModel> flowchartTemplateList = new ArrayList<>();
        File dir = new File("data/flows");
        File[] directoryListing = dir.listFiles();
        assert directoryListing != null;
        for (File child : directoryListing) {
            FlowchartTemplateModel template = getFlowchartTemplate(child, flowDataList);
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
    static FlowchartTemplateModel getFlowchartTemplate(File child, List<FlowchartTemplateDataModel> flowDataList) throws IOException {
        String content = new String(Files.readAllBytes(child.toPath()));
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(content);
        String flowchartCode = jsonNode.get("name").asText();

        //Should only ever be one match
        List<FlowchartTemplateDataModel> filteredFlowData = flowDataList.stream().filter((data) -> data.getCode().equals(flowchartCode)).toList();

        if (filteredFlowData.isEmpty()){
            throw new IOException("No Matching Major Data for File " + child.getPath());
        } else if (filteredFlowData.size() > 1){
            throw new IOException("Conflicting Major Data for File " + child.getPath());
        }
        FlowchartTemplateDataModel data = filteredFlowData.get(0);
        FlowchartTemplateModel template = new FlowchartTemplateModel();
        template.setCatalog(data.getCatalog());
        template.setMajor(data.getMajorName());
        template.setConcentration(data.getConcName());
        JsonNode termData = jsonNode.get("termData");
        template.setTermData(removeTIndex(termData));
        return template;
    }

    /**
     * Removes the unnecessary tIndex field from each term
     *
     * @param termData JsonNode for the list of terms from a flowchart template
     * @return  String representation of the final template
     * @throws JsonProcessingException for invalid JSON
     */
    public static String removeTIndex(JsonNode termData) throws JsonProcessingException {
        for(JsonNode term : termData){
            ((ObjectNode) term).remove("tIndex");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(termData);
    }


    @PostMapping("/api/FlowchartTemplates")
    public FlowchartTemplateModel saveFlowchartTemplate(@Validated @RequestBody FlowchartTemplateModel flowchartTemplate) {
        return flowchartTemplateRepo.save(flowchartTemplate);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/FlowchartTemplates/{id}")
    FlowchartTemplateModel getFlowchartTemplateById(@PathVariable long id) {
        return flowchartTemplateRepo.findById(id).orElse(null);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/FlowchartTemplates/Search")
    FlowchartTemplateModel getFlowchartTemplateByCatalogMajorAndCon(@RequestParam(required = true) String catalog,
                                                                    @RequestParam(required = true) String major,
                                                                    @RequestParam(required = true) String concentration) {
        return flowchartTemplateRepo.findByCatalogAndAndMajorAndConcentration(catalog, major, concentration).orElse(null);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/FlowchartTemplates")
    List<FlowchartTemplateModel> getAllFlowchartTemplates() {
        return flowchartTemplateRepo.findAll();
    }

    @DeleteMapping("/api/FlowchartTemplates")
    void deleteAllFlowchartTemplates(){
        flowchartTemplateRepo.deleteAll();
    }

}
