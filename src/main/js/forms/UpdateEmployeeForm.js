import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

/**
 * @author Venus Lumanglas
 */
const UpdateEmployeeForm = (props) => {

	const { employee, attributes, onUpdate } = props;
	const inputRef = useRef({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedEmployee = {};

		attributes.forEach(attribute => {
			updatedEmployee[attribute] = ReactDOM.findDOMNode(inputRef.current[attribute]).value.trim();
		});

		onUpdate(employee, updatedEmployee);

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	const inputs = attributes.map(attribute =>
		<FormGroup key={attribute}>
			<Input
				type="text"
				placeholder={attribute}
				defaultValue={employee.entity[attribute]}
				ref={el => inputRef.current[attribute] = el}
				className="field"
			/>
		</FormGroup>
	);
	const empId = `updateEmployee-${employee.entity._links.self.href.split('/').pop()}`;

	return (
		<div key={employee.entity._links.self.href}>
			<a className="btn btn-primary btn-sm" href={"#" + empId}>Update</a>
			<div id={empId} className="modalDialog">
				<div>
					<a href="#" title="Close" id="close">X</a>

					<h2 className="mt-3">Update an employee</h2>

					<Form onSubmit={handleSubmit}>
						{inputs}
						<FormGroup>
							<Button color="primary" type="submit">Update</Button>{' '}
							<a className="btn btn-secondary" href="#">Cancel</a>
						</FormGroup>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default UpdateEmployeeForm;