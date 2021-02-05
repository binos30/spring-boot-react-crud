import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import AppNavbar from './AppNavbar';
import CreateEmployeeForm from '../forms/CreateEmployeeForm';
import Employee from './Employee';
const when = require('when');
const client = require('../client').default;
const follow = require('../follow').default; // function to hop multiple links by "rel"
const root = '/api';

/**
 * @author Venus Lumanglas
 */
class EmployeeList extends Component {

	constructor(props) {
		super(props);
		this.pageSizeRef = React.createRef();
		this.state = {
			employees: [],
			links: {},
			pageSize: 20,
			totalPages: 0,
			pageNumber: 0,
			attributes: [],
			isLoading: true
		};

		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);

		this.handleInput = this.handleInput.bind(this);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	loadFromServer(pageSize) {
		follow(client, root, [{ rel: 'employees', params: { size: pageSize } }])
			.then(async employeeCollection => {
				const schema = await client({
					method: 'GET',
					path: employeeCollection.entity._links.profile.href,
					headers: { 'Accept': 'application/schema+json' }
				});
				this.schema = schema.entity;
				this.links = employeeCollection.entity._links;
				this.totalPages = employeeCollection.entity.page.totalPages;
				this.pageNumber = employeeCollection.entity.page.number;

				return employeeCollection;
			}).then(employeeCollection => {
				return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
				);
			}).then(employeePromises => {
				return when.all(employeePromises);
			}).done(employees => {
				this.setState({
					employees: employees,
					links: this.links,
					pageSize: pageSize,
					totalPages: this.totalPages,
					pageNumber: this.pageNumber,
					attributes: Object.keys(this.schema.properties),
					isLoading: false
				});
			});
	}

	onCreate(newEmployee) {
		follow(client, root, ['employees'])
			.then(response => {
				return client({
					method: 'POST',
					path: response.entity._links.self.href,
					entity: newEmployee,
					headers: { 'Content-Type': 'application/json' }
				})
			}).then(_res => {
				return follow(client, root, [{ rel: 'employees', params: { 'size': this.state.pageSize } }]);
			}).done(response => {
				if (typeof response.entity._links.last !== "undefined")
					this.onNavigate(response.entity._links.last.href);
				else
					this.onNavigate(response.entity._links.self.href);
			});
	}

	onUpdate(employee, updatedEmployee) {
		client({
			method: 'PUT',
			path: employee.entity._links.self.href,
			entity: updatedEmployee,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': employee.headers.Etag
			}
		}).done(_res => {
			this.loadFromServer(this.state.pageSize);
		}, response => {
			if (response.status.code === 412)
				alert(`DENIED: Unable to update employee ${employee.entity.firstName}. Your copy is stale.`);
		});
	}

	onDelete(employee) {
		client({ method: 'DELETE', path: employee.entity._links.self.href }).done(_res => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onNavigate(navUri) {
		client({ method: 'GET', path: navUri })
			.then(employeeCollection => {
				this.links = employeeCollection.entity._links;
				this.totalPages = employeeCollection.entity.page.totalPages;
				this.pageNumber = employeeCollection.entity.page.number;

				return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
				);
			}).then(employeePromises => {
				return when.all(employeePromises);
			}).done(employees => {
				this.setState({
					employees: employees,
					links: this.links,
					pageSize: this.state.pageSize,
					totalPages: this.totalPages,
					pageNumber: this.pageNumber,
					attributes: this.state.attributes
				});
			});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize)
			this.loadFromServer(pageSize);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.pageSizeRef.current).value;

		if (/^[0-9]+$/.test(pageSize))
			this.updatePageSize(pageSize);
		else
			ReactDOM.findDOMNode(this.pageSizeRef.current).value = pageSize.substring(0, pageSize.length - 1);
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.onNavigate(this.state.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.onNavigate(this.state.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.onNavigate(this.state.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.onNavigate(this.state.links.last.href);
	}

	render() {
		const {
			employees,
			links,
			pageSize,
			totalPages,
			pageNumber,
			attributes,
			isLoading
		} = this.state;

		const employeeList = employees.map(employee =>
			<Employee
				key={employee.entity._links.self.href}
				employee={employee}
				attributes={attributes}
				onUpdate={this.onUpdate}
				onDelete={this.onDelete}
			/>
		);
		const navLinks = [];

		if ("first" in links)
			navLinks.push(
				<PaginationItem key="first" disabled={!links.prev}>
					<PaginationLink
						onClick={this.handleNavFirst}
						first
						href="#"
					/>
				</PaginationItem>
			);
		if ("prev" in links)
			navLinks.push(
				<PaginationItem key="prev">
					<PaginationLink
						onClick={this.handleNavPrev}
						previous
						href="#"
					/>
				</PaginationItem>
			);
		if ("next" in links)
			navLinks.push(
				<PaginationItem key="next">
					<PaginationLink
						onClick={this.handleNavNext}
						next
						href="#"
					/>
				</PaginationItem>
			);
		if ("last" in links)
			navLinks.push(
				<PaginationItem key="last" disabled={!links.next}>
					<PaginationLink
						onClick={this.handleNavLast}
						last
						href="#"
					/>
				</PaginationItem>
			);

		if (isLoading)
			return <p>Loading...</p>;

		return (
			<div>
				<AppNavbar />
				<br />
				<Container>
					<CreateEmployeeForm attributes={attributes} onCreate={this.onCreate} />
					<h3>My Employees</h3>
					<input ref={this.pageSizeRef} defaultValue={pageSize} onInput={this.handleInput} />
					<Table className="mt-4" responsive striped bordered hover>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th width="10%">Actions</th>
							</tr>
						</thead>
						<tbody>
							{employeeList}
						</tbody>
					</Table>
					<div className="pagination-wrapper">
						<div className="text-center text-secondary">{!employees.length ? 'No employee found.' : `Page ${pageNumber + 1} of ${totalPages}`}</div>
						<Pagination aria-label="Page navigation">
							{navLinks}
						</Pagination>
					</div>
				</Container>
			</div>
		);
	}
}

export default EmployeeList;