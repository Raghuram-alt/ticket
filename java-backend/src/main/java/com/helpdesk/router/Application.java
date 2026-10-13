package com.helpdesk.router;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Main Spring Boot Application entrypoint for Support Ticket Router.
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println(" Starting SUPPORT TICKET ROUTER - Spring Boot API ");
        System.out.println(" Port: 8080");
        System.out.println("==================================================");
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
