import React, { Component } from 'react';
import { axiosGitHubGraphQL } from '../Tools';

const GET_ORGANIZATION = `
	{
		organization(login: "the-road-to-learn-react") {
			name
			url
		}
	}
`;
export default class extends Component {
	state = {
		path: 'the-road-to-learn-react/the-road-to-learn-react',
	};

	componentDidMount() {
		this.input.focus();
		this.onFetchFormGitHub();
	}

	onChange = e => {
		this.setState({ path: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
	};

	onFetchFormGitHub = () => {
		axiosGitHubGraphQL
			.post('', { query: GET_ORGANIZATION })
			.then(result => console.log(result));
	};
	render() {
		const { path } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="url">
					Show open issues for https://github.com/
				</label>
				<input
					type="text"
					ref={node => (this.input = node)}
					id="url"
					style={{ width: '300px' }}
					onChange={this.onChange}
					value={path}
				/>
				<button type="submit">Search</button>
			</form>
		);
	}
}
