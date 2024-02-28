package com.Q2S.Q2S_Senior_Project.Services;

import com.Q2S.Q2S_Senior_Project.Models.QuarterClass;
import org.drools.core.base.RuleNameMatchesAgendaFilter;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClassConversionService {
    @Autowired
    private KieContainer kieContainer;

    public List<SemesterClass> convertQuarterToSemester(String quarterClassId, String ruleName) {
        List<SemesterClass> convertedClasses = new ArrayList<>();

        KieSession kieSession = kieContainer.newKieSession();

        QuarterClass quarterClass = new QuarterClass();
        quarterClass.setId(quarterClassId);

        kieSession.insert(quarterClass);
        kieSession.setGlobal("convertedClasses", convertedClasses);
        kieSession.fireAllRules(new RuleNameMatchesAgendaFilter(ruleName));
        kieSession.dispose();

        return convertedClasses;
    }
}
