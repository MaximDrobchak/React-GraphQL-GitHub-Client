import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import VanilaGraphQL from '../Vanilla-Client-GitHubAPIv4-GraphQL';
import ApolloClientGithubGraphQL from '../ApolloClientGithubGraphQL/index.jsx';
import Navigation from '../Navigation';

const LINKS = [
	{ label: 'Apollo-Client-Github-GraphQL', to: '/' },
	{
		label: 'React-GraphQL-GitHub-Vanilla',
		to: '/graphqlvanilla',
	},
];

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navigation links={LINKS} />

					<Route
						exact
						path="/"
						component={ApolloClientGithubGraphQL}
					/>
					<Route
						exact
						path="/graphqlvanilla"
						component={VanilaGraphQL}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
