import React, { Component } from 'react';
import { axiosGitHubGraphQL } from '../Tools';
import Organization from './OrganizationRepository';
import '../../Styles/index.scss';

const getIssuesOfRepositoryQuery = (
	organization,
	repository
) => `
	{
		organization(login: "${organization}") {
			name
			url
			repository(name: "${repository}") {
				name
				url
				issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
			}
		}
	}
`;

export default class extends Component {
	state = {
		path: 'the-road-to-learn-react/the-road-to-learn-react',
		organization: null,
		errors: null,
	};

	componentDidMount() {
		this.input.focus();
		this.onFetchFormGitHub(this.state.path);
	}

	onChange = e => {
		this.setState({ path: e.target.value });
	};

	onSubmit = e => {
		this.onFetchFormGitHub(this.state.path);
		e.preventDefault();
	};

	onFetchFormGitHub = path => {
		const [organization, repository] = path.split('/');

		axiosGitHubGraphQL
			.post('', {
				query: getIssuesOfRepositoryQuery(
					organization,
					repository
				),
			})
			.then(result => {
				console.log(result);
				this.setState(() => ({
					organization: result.data.data.organization,
					errors: result.data.errors,
				}));
			});
	};

	render() {
		const { path, organization, errors } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="url">
					Show open issues for https://github.com/
				</label>
				<br />
				<input
					type="text"
					ref={node => (this.input = node)}
					id="url"
					onChange={this.onChange}
					value={path}
				/>
				<button type="submit">Search</button>
				{organization ? (
					<Organization organization={organization} />
				) : (
					<p>Ni information yet ...</p>
				)}
				{errors && (
					<span className="errors">{errors.message}</span>
				)}
			</form>
		);
	}
}
