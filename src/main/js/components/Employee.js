import React, { Component } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UpdateEmployeeForm from '../forms/UpdateEmployeeForm';

/**
 * @author Venus Lumanglas
 */
class Employee extends Component {

	constructor(props) {
		super(props);
		this.state = { modal: false };
		this.handleDelete = this.handleDelete.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.employee);
	}

	toggle() {
		this.setState({ modal: !this.state.modal });
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
						<Button size="sm" color="danger" onClick={this.toggle}>Delete</Button>
						<Modal isOpen={this.state.modal} toggle={this.toggle}>
							<ModalHeader toggle={this.toggle}>Delete employee</ModalHeader>
							<ModalBody>
								Are you sure you want to delete employee {employee.entity.firstName} {employee.entity.lastName}?
        					</ModalBody>
							<ModalFooter>
								<Button color="primary" onClick={this.handleDelete}>Yes</Button>{' '}
								<Button color="secondary" onClick={this.toggle}>No</Button>
							</ModalFooter>
						</Modal>
					</ButtonGroup>
				</td>
			</tr>
		)
	}
}

export default Employee;