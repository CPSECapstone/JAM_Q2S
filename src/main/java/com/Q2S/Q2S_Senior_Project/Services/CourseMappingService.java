package com.Q2S.Q2S_Senior_Project.Services;

import org.kie.api.KieBase;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;


@Service
public class CourseMappingService {
    private final KieContainer kieContainer;

    @Autowired
    public CourseMappingService(KieContainer kieContainer){this.kieContainer = kieContainer;}

    /**
     * Fire rules for a course mapping object
     *
     * @param courseMapping mapping object with  "startCourse" initialized with a course code
     * @return      the object with the "mapping" field set by the rules engine or null if no
     *              corresponding rules exist
     */
    public CourseMapping mappingService(CourseMapping courseMapping) {
        KieBase kBase = kieContainer.getKieBase("rules");
        KieSession kieSession = kBase.newKieSession();
        kieSession.insert(courseMapping);
        kieSession.fireAllRules();
        kieSession.dispose();
        return courseMapping;
    }
}
