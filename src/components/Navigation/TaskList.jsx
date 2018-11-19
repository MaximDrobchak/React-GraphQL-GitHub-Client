import React, { Component } from 'react';
import './Navigation.scss';

export default class extends Component {
	state = {
		isHovered: false,
	};

	handleEnter = () => {
		this.setState({
			isHovered: true,
		});
	};

	handleLeave = () => {
		this.setState({
			isHovered: false,
		});
	};
	render() {
		return (
			<ul>
				<li>
					<div
						onMouseEnter={this.handleEnter}
						onMouseLeave={this.handleLeave}
					>
						<a href="#link" alt="">
							TaskList
						</a>
						{this.state.isHovered ? (
							<ul className="task-list">
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
										Обновление асинхронного рендеринга
										ReactJs
									</a>
								</li>
								<li>
									<a
										href="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html"
										alt=""
									>
										Подробнее о методах жизниного цикла
										ReactJs
									</a>
								</li>
							</ul>
						) : (
							<div />
						)}
					</div>
				</li>
			</ul>
		);
	}
}
