package com.Q2S.Q2S_Senior_Project;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@SpringBootApplication
public class Q2SSeniorProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(Q2SSeniorProjectApplication.class, args);
	}

	@Bean
	public KieContainer kieContainer(){
		return KieServices.Factory.get().getKieClasspathContainer();
	}
}
