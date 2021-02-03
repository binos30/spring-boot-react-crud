package com.binos.springbootreactcrud.service;

import java.util.Collection;
import java.util.Optional;

import com.binos.springbootreactcrud.model.Employee;

/**
 * @author Venus Lumanglas
 */
public interface EmployeeService {

	Collection<Employee> getEmployees();

	Optional<Employee> getEmployeeById(Long id);

	Employee addEmployee(Employee employee);

	Employee updateEmployee(Employee employee);

	void deleteEmployee(Long id);

	void createEmployees();

}
