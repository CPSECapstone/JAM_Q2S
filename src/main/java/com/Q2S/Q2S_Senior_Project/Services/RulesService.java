package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.Degree;
import com.Q2S.Q2S_Senior_Project.Models.Requirement;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kie.api.KieBase;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;



@Service
public class RulesService {
    private final KieContainer kieContainer;

    @Autowired
    public RulesService(KieContainer kieContainer){this.kieContainer = kieContainer;}

    public CourseMapping mappingService(CourseMapping courseMapping) {
        KieBase kBase = kieContainer.getKieBase("courseMappingBase");
        KieSession kieSession = kBase.newKieSession();
        kieSession.insert(courseMapping);
        kieSession.fireAllRules();
        kieSession.dispose();
        return courseMapping;
    }

    public Requirement requirementService(Requirement requirement, Degree degree) {
        KieBase kBase = kieContainer.getKieBase("requirementBase");
        KieSession kieSession = kBase.newKieSession();
        kieSession.insert(degree);
        kieSession.insert(requirement);
        kieSession.fireAllRules();
        kieSession.dispose();
        return requirement;
    }
//
//    public static Degree parseJsonToDegree(String degreeName) {
//        Connection conn = null;
//        PreparedStatement pstmt = null;
//        ResultSet rs = null;
//        Degree degree = null;
//
//        try {
//            conn = DriverManager.getConnection(DB_URL, USER, PASS);
//            String sql = "SELECT requirements FROM degree_requirements2022-2026 WHERE degree_name = ?";
//            pstmt = conn.prepareStatement(sql);
//            pstmt.setString(1, degreeName);
//            rs = pstmt.executeQuery();
//
//            if (rs.next()) {
//                String jsonString = rs.getString("requirements");
//                ObjectMapper objectMapper = new ObjectMapper();
//                degree = objectMapper.readValue(jsonString, Degree.class);
//            }
//        } catch (SQLException | IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (rs != null) rs.close();
//                if (pstmt != null) pstmt.close();
//                if (conn != null) conn.close();
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return degree;
//    }

    //static method here to make degree and call in the controller
    //business logic should be here
}
