'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';

/**
 * @author Venus Lumanglas
 */
class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/employees' exact component={EmployeeList} />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
