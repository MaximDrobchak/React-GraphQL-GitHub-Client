import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.scss';
import TaskList from './TaskList';
const Navigation = ({ links }) => {
	return (
		<div className="Navigation">
			<ul>
				{links.map(link => (
					<li key={link.to}>
						<Link to={link.to}>{link.label}</Link>
					</li>
				))}
				<span>
					<TaskList />
				</span>
			</ul>
		</div>
	);
};

export default Navigation;
