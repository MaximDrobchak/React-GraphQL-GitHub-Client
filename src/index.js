import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
// import App from './components/TestingComponent';

import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';

// ApolloLink называется конечной ссылкой, потому что он превращает операцию в результат
import { ApolloLink } from 'apollo-link';

// ссылка по умолчанию
const GITHUB_BASE_URL = 'https://api.github.com/graphql';

// Обработка ошибки сетевого запросса
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		// do something with graphql error
	}

	if (networkError) {
		// do something with network  error
	}
});

//
const httpLink = new HttpLink({
	uri: GITHUB_BASE_URL, // определяющее единственную конечную точку API GraphQL
	headers: {
		authorization: `Bearer ${
			process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
		}`, // авторизовать себя с помощью своего токена доступа
	},
});

// Обеденим error & http Links в масив чтобы передать их как аргумент
const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache(); //  Кэш нормализует ваши данные, кэширует запросы

const client = new ApolloClient({
	link,
	cache,
}); // используем созданые рание настройки для реализации Apollo Client

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
