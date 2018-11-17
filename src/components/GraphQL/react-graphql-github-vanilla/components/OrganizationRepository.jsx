import React from 'react';

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

export default Organization;
