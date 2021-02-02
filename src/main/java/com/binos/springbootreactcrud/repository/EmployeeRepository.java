package com.binos.springbootreactcrud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.binos.springbootreactcrud.model.Employee;

/**
 * @author Venus Lumanglas
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	Employee findByFirstName(String firstName);

	List<Employee> findAllByOrderByFirstNameAsc();
}
