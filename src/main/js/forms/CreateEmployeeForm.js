import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

/**
 * @author Venus Lumanglas
 */
const CreateEmployeeForm = (props) => {

	const { attributes, onCreate } = props;

	const inputRef = useRef({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const newEmployee = {};

		attributes.forEach(attribute => {
			newEmployee[attribute] = ReactDOM.findDOMNode(inputRef.current[attribute]).value.trim();
		});

		onCreate(newEmployee);

		// clear out the dialog's inputs
		attributes.forEach(attribute => {
			ReactDOM.findDOMNode(inputRef.current[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	const inputs = attributes.map(attribute =>
		<FormGroup key={attribute}>
			<Input
				type="text"
				placeholder={attribute}
				ref={el => inputRef.current[attribute] = el}
				className="field"
			/>
		</FormGroup>
	);

	return (
		<div>
			<div className="float-right">
				<a className="btn btn-success" href="#createEmployee">Create</a>
			</div>
			<div id="createEmployee" className="modalDialog">
				<div>
					<a href="#" title="Close" id="close">X</a>

					<h2 className="mt-3">Create new employee</h2>

					<Form onSubmit={handleSubmit}>
						{inputs}
						<FormGroup>
							<Button color="primary" type="submit">Create</Button>{' '}
							<a className="btn btn-secondary" href="#">Cancel</a>
						</FormGroup>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default CreateEmployeeForm;