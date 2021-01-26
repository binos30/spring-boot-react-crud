package com.binos.springbootcrud;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.binos.springbootcrud.service.ItemService;

/**
 * @author Venus Lumanglas
 */
@SpringBootApplication
public class SpringBootCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootCrudApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(final ItemService itemService) {
		return args -> itemService.createItems();
	}

}
