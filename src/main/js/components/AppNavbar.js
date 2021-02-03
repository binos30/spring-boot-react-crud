import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

/**
 * @author Venus Lumanglas
 */
class AppNavbar extends Component {

	constructor(props) {
		super(props);
		this.state = { isOpen: false };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<Navbar color="dark" dark expand="md">
				<NavbarBrand tag={Link} to="/">Home</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="https://www.facebook.com/B1NOS/" target="_blank">
								Facebook
            				</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/binos30" target="_blank">
								GitHub
            				</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://www.linkedin.com/in/binos30/" target="_blank">
								LinkedIn
            				</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default AppNavbar;