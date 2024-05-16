package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.Requirement;
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

    public Requirement requirementService(Requirement requirement) {
        KieBase kBase = kieContainer.getKieBase("requirementBase");
        KieSession kieSession = kBase.newKieSession();
        kieSession.insert(requirement);
        kieSession.fireAllRules();
        kieSession.dispose();
        return requirement;
    }
}
