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
				<li>
					<a
						href="https://blog.apollographql.com/full-stack-react-graphql-tutorial-582ac8d24e3b"
						alt=""
					>
						Apollo Full-stak Tutorial
					</a>
				</li>
				<li>
					<a
						href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html"
						alt=""
					>
						Обновление асинхронного рендеринга ReactJs
					</a>
				</li>
				<li>
					<a
						href="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html"
						alt=""
					>
						Подробнее о методах жизниного цикла ReactJs
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;
