package com.Q2S.Q2S_Senior_Project;

import org.kie.api.runtime.KieContainer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DroolsConfig {
    @Bean
    public KieContainer kieContainer() {
        return org.kie.api.KieServices.Factory.get().getKieClasspathContainer();
    }
}
