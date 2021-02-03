import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import UpdateEmployeeForm from '../forms/UpdateEmployeeForm';

/**
 * @author Venus Lumanglas
 */
class Employee extends Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.employee);
	}

	render() {
		const { employee, attributes, onUpdate } = this.props;

		return (
			<tr>
				<td>{employee.entity.firstName}</td>
				<td>{employee.entity.lastName}</td>
				<td>{employee.entity.email}</td>
				<td>
					<ButtonGroup>
						<UpdateEmployeeForm employee={employee} attributes={attributes} onUpdate={onUpdate} />
						<Button size="sm" color="danger" onClick={this.handleDelete}>Delete</Button>
					</ButtonGroup>
				</td>
			</tr>
		)
	}
}

export default Employee;