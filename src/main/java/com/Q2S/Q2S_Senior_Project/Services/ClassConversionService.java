package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.CourseMapping;
import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import com.Q2S.Q2S_Senior_Project.Models.RulesClass;
import org.drools.core.base.RuleNameMatchesAgendaFilter;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ClassConversionService {
    @Autowired
    private KieContainer kieContainer;

    public CourseMapping getMapping(RulesClass course, CourseMapping mapping) {
        KieSession kieSession = kieContainer.newKieSession();
        //kieSession.setGlobal("mapping", mapping);
        kieSession.insert(course);
        kieSession.fireAllRules();
        kieSession.dispose();
        System.out.println("INSIDE GETMAPPING");
        return mapping;
    }
}
