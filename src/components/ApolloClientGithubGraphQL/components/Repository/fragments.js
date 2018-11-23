import gql from 'graphql-tag';

// Часто используемый запрос потому инкапс фрагмент GraphQL
const REPOSITORY_FRAGMENT = gql`
	fragment repository on Repository {
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
`;

export default REPOSITORY_FRAGMENT;
