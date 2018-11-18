import axios from 'axios';

const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = `
  mutation ($repositoryId: ID!) {
    removeStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
export const getIssuesOfRepository = (path, cursor) => {
	const [organization, repository] = path.split('/');

	return axiosGitHubGraphQL.post('', {
		query: GET_ISSUES_OF_REPOSITORY,
		variables: { organization, repository, cursor },
	});
};

export const addStarToRepository = repositoryId =>
	axiosGitHubGraphQL.post('', {
		query: ADD_STAR,
		variables: { repositoryId },
	});

export const removeStarFromRepository = repositoryId =>
	axiosGitHubGraphQL.post('', {
		query: REMOVE_STAR,
		variables: { repositoryId },
	});

export const axiosGitHubGraphQL = axios.create({
	baseURL: 'https://api.github.com/graphql',
	headers: {
		Authorization: `Bearer ${
			process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
		}`,
	},
});
