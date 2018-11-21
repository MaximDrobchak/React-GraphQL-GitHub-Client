import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
import ShouldComponentUpdate from './ShouldComponentUpdate';

const LINKS = [
	{
		id: 0,
		to: '/',
		title: 'Life Cicle',
	},
];

const Navigator = () => (
	<table>
		<tbody>
			<tr>
				{LINKS.map(link => (
					<td key={link.id}>
						<Link
							to={link.to}
							target="_blank"
							rel="noopener noreferrer"
						>
							{link.title}
						</Link>
					</td>
				))}
			</tr>
		</tbody>
	</table>
);

const App = () => (
	<Router>
		<div>
			<Navigator />
			<hr />
			<Route exact path="/" component={ShouldComponentUpdate} />
		</div>
	</Router>
);

export default App;
