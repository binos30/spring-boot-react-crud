package com.binos.springbootreactcrud.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.binos.springbootreactcrud.model.Employee;
import com.binos.springbootreactcrud.repository.EmployeeRepository;

/**
 * @author Venus Lumanglas
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Collection<Employee> getEmployees() {
		return employeeRepository.findAllByOrderByFirstNameAsc();
	}

	@Override
	public Optional<Employee> getEmployeeById(Long id) {
		return employeeRepository.findById(id);
	}

	@Override
	public Employee addEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Employee updateEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public void deleteEmployee(Long id) {
		employeeRepository.deleteById(id);
	}

	@Override
	public void createEmployees() {
		if (employeeRepository.findAll().size() == 0) {
			Employee item1 = new Employee();

			/*
			 * item1.setName("Apple"); item1.setQuantity(20);
			 * 
			 * addItem(item1);
			 * 
			 * Employee item2 = new Employee();
			 * 
			 * item2.setName("Banana"); item2.setQuantity(25);
			 */

//			addItem(item2);
		}

	}
}
