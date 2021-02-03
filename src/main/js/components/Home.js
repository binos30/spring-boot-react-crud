import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

/**
 * @author Venus Lumanglas
 */
class Home extends Component {

	render() {
		return (
			<div>
				<AppNavbar />
				<Container fluid>
					<Button color="link"><Link to="/employees">Manage Employees</Link></Button>
				</Container>
			</div>
		);
	}
}

export default Home;