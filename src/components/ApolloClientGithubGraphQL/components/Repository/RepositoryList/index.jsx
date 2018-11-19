import React from 'react';

import RepositoryItem from '../RepositoryItem';

import '../style.scss';

//  Компонент принимает массив репозиториев только как реквизит,
// который будет извлекаться с помощью запроса GraphQL

const RepositoryList = ({ repositories }) =>
	repositories.edges.map(({ node }) => (
		<div key={node.id} className="RepositoryItem">
			<RepositoryItem {...node} />
		</div>
	));
export default RepositoryList;
