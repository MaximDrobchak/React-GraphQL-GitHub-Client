import axios from 'axios';

export const axiosGitHubGraphQL = axios.create({
	baseURL: 'https://api.github.com/graphql',
	headers: {
		Authorization: `Bearer ${
			process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
		}`,
	},
});
