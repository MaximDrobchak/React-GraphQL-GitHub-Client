import React, { Component } from 'react';
import { axiosGitHubGraphQL } from '../Tools';

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

const Repository = ({ repository }) => (
	<div>
		<p>
			<strong>In Repository</strong>
			<a href={repository.url}>{repository.url}</a>
		</p>

		<ul>
			{repository.issues.edges.map(issue => (
				<li key={issue.node.id}>
					<a href={issue.node.url}>{issue.node.title}</a>
				</li>
			))}
		</ul>
	</div>
);

const Organization = ({ organization, errors }) => {
	if (errors)
		return (
			<p>
				<strong>Something went wrong:</strong>
				{errors.map(error => error.message).join(' ')}
			</p>
		);
	return (
		<div>
			<p>
				<strong>Issues from Organization:</strong>
			</p>
			<a href={organization.url}>{organization.name}</a>

			<Repository repository={organization.repository} />
		</div>
	);
};
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
				<input
					type="text"
					ref={node => (this.input = node)}
					id="url"
					style={{ width: '300px' }}
					onChange={this.onChange}
					value={path}
				/>
				<button type="submit">Search</button>
				{organization ? (
					<Organization organization={organization} />
				) : (
					<p>Ni information yet ...</p>
				)}
			</form>
		);
	}
}
