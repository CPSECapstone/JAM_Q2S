package com.Q2S.Q2S_Senior_Project.Controllers;

import com.Q2S.Q2S_Senior_Project.DataTransferObjects.NewUserFlowchartDTO;
import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateModel;
import com.Q2S.Q2S_Senior_Project.Models.UserFlowchartModel;
import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import com.Q2S.Q2S_Senior_Project.Repositories.UserFlowchartRepo;
import com.Q2S.Q2S_Senior_Project.Services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RestController
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

    @Autowired
    private UserFlowchartRepo userFlowchartRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private FlowchartTemplateController flowchartTemplateController;

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/api/UserFlowcharts")
    List<UserFlowchartModel> getAllFlowcharts(){
        return userFlowchartRepo.findAll();
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/api/UserFlowcharts/{userId}")
    List<UserFlowchartModel> getAllFlowchartsByUserId(@PathVariable long userId) {
        return userFlowchartRepo.findByUserIdUserId(userId);
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/api/UserFlowcharts/{userId}")
    ResponseEntity<UserFlowchartModel> addNewUserFlowchart(@PathVariable long userId,
                                                          @Validated @RequestBody NewUserFlowchartDTO dto){
        UserFlowchartModel newFlowchart = new UserFlowchartModel();
        Optional<UserModel> user = userService.findUserModelById(userId);
        if (user.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        newFlowchart.setUserId(user.get());
        newFlowchart.setName(dto.getFlowchartName());
        newFlowchart.setCatalogYear(dto.getCatalogYear());
        newFlowchart.setMajor(dto.getMajor());
        newFlowchart.setConcentration(dto.getConcentration());
        //by default main and favorite are false
        newFlowchart.setMain(false);
        newFlowchart.setFavorite(false);
        FlowchartTemplateModel flowchartTemplateModel = flowchartTemplateController.getFlowchartTemplateByCatalogMajorAndCon(dto.getCatalogYear(), dto.getMajor(), dto.getConcentration());
        if (flowchartTemplateController == null){
            return ResponseEntity.notFound().build();
        }
        String jsonTermData;
        try {
            //when termAdmitted is forced to be NonNull in UserModel we can grab it from the UserModel instead
            jsonTermData = makeJsonFrontendCompatible(createNewUserQuarterFlowchart(dto.getTerm_admitted(), flowchartTemplateModel.getTermData()));
        } catch (IOException e) {
            return ResponseEntity.unprocessableEntity().build();
        }
        newFlowchart.setTermData(jsonTermData);

        return ResponseEntity.ok().body(userFlowchartRepo.save(newFlowchart));

    }





    /**
     * Personalizes the given quarter flowchart template to match the given term admitted
     * by setting the term names and term types. It also adds summer terms.
     *
     * @param termAdmitted          Assumes the format "<Term> <Year>"
     * @param flowchartTemplate     JSON String of the appropriate template
     * @return   String of the template personalized to the user
     */
    static String createNewUserQuarterFlowchart(String termAdmitted, String flowchartTemplate) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        int[] intInfo = getValidatedTermAdmittedYearAndOrdinal(termAdmitted);
        JsonNode rootNode = getValidatedFlowchartTemplateInfo(flowchartTemplate);
        ArrayNode terms = (ArrayNode) rootNode;
        int termSeasonIterator = intInfo[1] -1; //iterate from one term before when the students started
        int year = (TermSeason.values()[intInfo[1]] == TermSeason.Winter) ? intInfo[0] - 1: intInfo[0];
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
                newObject.set("courses", mapper.createArrayNode());
                terms.insert(index,newObject);
                termSeasonIterator++;
                offset++;
            }
            if (termSeason == TermSeason.Fall){
                year++;
            }

            termSeasonIterator++;
        }

        return mapper.writeValueAsString(terms);
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
        int ordinal;
        try {
            if (splitTermAdmitted.length != 2) {
                throw new IllegalStateException("Term Admitted has an invalid format. Required: <Term> <Year>. Given: " + termAdmitted);
            }
            admitYear = Integer.parseInt(splitTermAdmitted[1]);
            ordinal = getStartingOrdinal(splitTermAdmitted[0]);
            if (TermSeason.values()[ordinal] == TermSeason.Winter && admitYear > SEMESTER_TRANSITION_YEAR){
                throw new IllegalStateException("Term Admitted is invalid. There is no winter term in " + admitYear);
            }
        } catch (NumberFormatException e) {
            throw new IllegalStateException("Term Admitted has an invalid year format. Required: <YYYY>. Given: " + splitTermAdmitted[1]);
        }
        return new int[] {admitYear, ordinal};
    }

    /**
     * Validates the given flowchart template string and returns the flowchart as a JsonNode
     *
     * @param flowchartTemplate   String of Flowchart template for major, concentration, and catalog chosen
     * @return                    Flowchart personalized to the termAdmitted submitted
     */
    private static JsonNode getValidatedFlowchartTemplateInfo(String flowchartTemplate){
        JsonNode rootNode;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            rootNode = objectMapper.readTree(flowchartTemplate);
            if (!rootNode.isArray()){
                throw new IllegalStateException("Flowchart template is improperly formatted. It should be an array.");
            }
        } catch (JsonProcessingException e){
            throw new IllegalStateException("Flowchart is in invalid JSON format.");
        }
        return rootNode;
    }

    /**
     *
     * @param originalFlowchart flowchart template string from database
     * @return JSON String with taken and uuid fields for each course
     * @throws JsonProcessingException - invalid JSON
     */
    static String makeJsonFrontendCompatible(String originalFlowchart) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode coursesNode = objectMapper.readTree(originalFlowchart);
        for(JsonNode term : coursesNode){
            JsonNode classes = term.get("courses");
            for(JsonNode flowchartClass : classes){
                ((ObjectNode) flowchartClass).put("taken", false);
                UUID uuid = UUID.randomUUID();
                ((ObjectNode) flowchartClass).put("uuid", String.valueOf(uuid));
            }
        }
        return objectMapper.writeValueAsString(coursesNode);
    }

    /**
     * returns the ordinal of the enum corresponding to the season of the given termAdmitted
     * throws an exception if an invalid value is given
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
