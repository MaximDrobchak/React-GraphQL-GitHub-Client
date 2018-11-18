import React, { Component } from 'react';
import {
	getIssuesOfRepository,
	addStarToRepository,
} from '../Tools';
import Organization from './OrganizationRepository';
import '../../Styles/index.scss';

const resolveAddStarMutation = mutationResult => state => {
	const {
		viewerHasStarred,
	} = mutationResult.data.data.addStar.starrable;

	const {
		totalCount,
	} = state.organization.repository.stargazers;

	return {
		...state,
		organization: {
			...state.organization,
			repository: {
				...state.organization.repository,
				viewerHasStarred,
				stargazers: {
					totalCount: totalCount + 1,
				},
			},
		},
	};
};

const resolveIssuesQuery = (
	queryResult,
	cursor
) => state => {
	const { data, errors } = queryResult.data;

	if (!cursor) {
		return {
			organization: data.organization,
			errors,
		};
	}

	const {
		edges: oldIssues,
	} = state.organization.repository.issues;
	const {
		edges: newIssues,
	} = data.organization.repository.issues;
	const updatedIssues = [...oldIssues, ...newIssues];

	return {
		organization: {
			...data.organization,
			repository: {
				...data.organization.repository,
				issues: {
					...data.organization.repository.issues,
					edges: updatedIssues,
				},
			},
		},
		errors,
	};
};
export default class extends Component {
	state = {
		path: 'the-road-to-learn-react/the-road-to-learn-react',
		organization: null,
		errors: null,
	};

	componentDidMount() {
		this.onFetchFromGitHub(this.state.path);
	}

	onChange = event => {
		this.setState({ path: event.target.value });
	};

	onSubmit = event => {
		this.onFetchFromGitHub(this.state.path);

		event.preventDefault();
	};

	onFetchFromGitHub = (path, cursor) => {
		getIssuesOfRepository(path, cursor).then(queryResult =>
			this.setState(resolveIssuesQuery(queryResult, cursor))
		);
	};

	onFetchMoreIssues = () => {
		const {
			endCursor,
		} = this.state.organization.repository.issues.pageInfo;

		this.onFetchFromGitHub(this.state.path, endCursor);
	};

	onStarRepository = (repositoryId, viewerHasStarred) => {
		addStarToRepository(repositoryId).then(mutationResult =>
			this.setState(resolveAddStarMutation(mutationResult))
		);
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
					<Organization
						organization={organization}
						errors={errors}
						onFetchMoreIssues={this.onFetchMoreIssues}
						onStarRepository={this.onStarRepository}
					/>
				) : (
					<p>No information yet ...</p>
				)}
				{errors && (
					<span className="errors">{errors.message}</span>
				)}
			</form>
		);
	}
}
