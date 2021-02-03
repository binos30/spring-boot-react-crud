//package com.binos.springbootreactcrud.controller;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.util.Collection;
//import java.util.Optional;
//
//import javax.validation.Valid;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.binos.springbootreactcrud.model.Employee;
//import com.binos.springbootreactcrud.service.EmployeeService;
//
///**
// * @author Venus Lumanglas
// */
//@RestController
//@RequestMapping("/api")
//public class EmployeeController {
//
//	private final Logger log = LoggerFactory.getLogger(EmployeeController.class);
//
//	@Autowired
//	private EmployeeService employeeService;
//
//	@GetMapping("/employees")
//	public Collection<Employee> employees() {
//		return employeeService.getEmployees();
//	}
//
//	@GetMapping("/employees/{id}")
//	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
//		Optional<Employee> employee = employeeService.getEmployeeById(id);
//		return employee.map(response -> ResponseEntity.ok().body(response))
//				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}
//
//	@PostMapping("/employees")
//	public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
//		log.info("Request to add employee: {}", employee);
//		Employee result = employeeService.addEmployee(employee);
//		return ResponseEntity.created(new URI("/api/employees/" + result.getId())).body(result);
//	}
//
//	@PutMapping("/employees/{id}")
//	public ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee) {
//		log.info("Request to update employee: {}", employee);
//		Employee result = employeeService.updateEmployee(employee);
//		return ResponseEntity.ok().body(result);
//	}
//
//	@DeleteMapping("/employees/{id}")
//	public ResponseEntity<Object> deleteEmployee(@PathVariable Long id) {
//		log.info("Request to delete employee: {}", id);
//		employeeService.deleteEmployee(id);
//		return new ResponseEntity<Object>("Successfully Deleted", HttpStatus.OK);
//	}
//}
