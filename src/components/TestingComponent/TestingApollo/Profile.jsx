import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
	{
		viewer {
			repositories(
				first: 5
				orderBy: { direction: DESC, field: STARGAZERS }
			) {
				edges {
					node {
						id
						name
						url
						descriptionHTML
						primaryLanguage {
							name
						}
						owner {
							login
							url
						}
						stargazers {
							totalCount
						}
						viewerHasStarred
						watchers {
							totalCount
						}
						viewerSubscription
					}
				}
			}
		}
	}
`;

const Profile = () => (
	<Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>{error}</p>;
					console.log(data)
			return (
				<ul>
					<li>{data.repositories.name}</li>
				</ul>
			);
		}}
	</Query>
);

export default Profile;
