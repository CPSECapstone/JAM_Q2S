package com.Q2S.Q2S_Senior_Project.Services;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.RulesClass;


@Service
public class ClassConversionService {
    private final KieContainer kieContainer;

    @Autowired
    public ClassConversionService(KieContainer kieContainer){this.kieContainer = kieContainer;}

    public CourseMapping getCourseMapping(CourseMapping courseMapping) {
        KieSession kieSession = kieContainer.newKieSession("rulesSession");
        kieSession.insert(courseMapping);
        kieSession.fireAllRules();
        kieSession.dispose();
        return courseMapping;
    }
}
