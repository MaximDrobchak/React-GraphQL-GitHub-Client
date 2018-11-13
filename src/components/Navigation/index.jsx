import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.scss';

const Navigation = ({ links }) => {
	return (
		<div className="Navigation">
			<ul>
				{links.map(link => (
					<li key={link.to}>
						<Link to={link.to}>{link.label}</Link>
					</li>
				))}
				<li>
					<a
						href="https://blog.apollographql.com/react-graphql-tutorial-mutations-764d7ec23c15"
						alt=""
					>
						Apollo RESTfull
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;
