package com.binos.springbootreactcrud;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.binos.springbootreactcrud.service.EmployeeService;

/**
 * @author Venus Lumanglas
 */
@SpringBootApplication
public class SpringBootReactCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootReactCrudApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(final EmployeeService employeeService) {
		return args -> employeeService.createEmployees();
	}

}