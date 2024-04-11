package com.Q2S.Q2S_Senior_Project;

import org.kie.api.KieServices;
import org.kie.api.builder.*;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.internal.io.ResourceFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
@ComponentScan("com.Q2S.Q2S_Senior_Project")
public class DroolsConfig {
    private static final String COURSE_MAPPING_RULES = "../Rules/courseMappings.drl";

    @Bean
    public KieContainer kieContainer() {
        KieServices kieServices = KieServices.Factory.get();

        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource(COURSE_MAPPING_RULES));
        KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        KieModule kieModule = kieBuilder.getKieModule();
        System.out.println("INSTANTIATE DONE IN DROOLS CONFIG");

        return kieServices.newKieContainer(kieModule.getReleaseId());
    }

}
