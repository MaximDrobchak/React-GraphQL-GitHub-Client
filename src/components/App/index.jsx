import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';

import { VanilaGraphQL } from '../GraphQL';
import Navigation from '../Navigation';

const LINKS = [
	{ label: 'React-GraphQL-GitHub-Vanilla', to: '/' },
];

class App extends Component {
	render() {
		return (
			<div>
				<Navigation links={LINKS} />

				<Router>
					<div>
						<Route
							exact
							path="/"
							component={VanilaGraphQL}
						/>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
