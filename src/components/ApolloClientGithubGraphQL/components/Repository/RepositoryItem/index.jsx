import React from 'react';
import { Mutation } from 'react-apollo';
import { graphql } from 'react-apollo';

import Link from '../../Link';
import Button from '../../Button';

import '../style.scss';

import {
	STAR_REPOSITORY,
	UNSTAR_REPOSITORY,
	WATCH_REPOSITORY,
} from '../mutations';

import REPOSITORY_FRAGMENT from '../fragments';
import Repository from './../../../../TestingComponent/TestingApollo/Repository';

const VIEWER_SUBSCRIPTIONS = {
	SUBSCRIBED: 'SUBSCRIBED',
	UNSUBSCRIBED: 'UNSUBSCRIBED',
};

const updateAddStar = (
	client,
	{
		data: {
			addStar: {
				starrable: { id },
			},
		},
	},
	mutationResult,
) => {
	const repository = client.readFragment({
		id: `Repository:${id}`,
		fragment: REPOSITORY_FRAGMENT,
	});

	// update count of stargazers of repository
	const totalCount = repository.stargazers.totalCount + 1;

	// write repository back to cache
	client.writeFragment({
		id: `Repository:${id}`,
		fragment: REPOSITORY_FRAGMENT,
		data: {
			...repository,
			stargazers: {
				...repository.stargazers,
				totalCount,
			},
		},
	});
};

const isWatch = viewerSubscription =>
	viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const RepositoryItem = ({
	id,
	name,
	url,
	descriptionHTML,
	primaryLanguage,
	owner,
	stargazers,
	watchers,
	viewerSubscription,
	viewerHasStarred,
}) => (
	<div>
		<div className="RepositoryItem-title">
			<h2>
				<Link href={url}>{name}</Link>
			</h2>

			<div>
				<Mutation
					mutation={WATCH_REPOSITORY}
					variables={{
						id,
						viewerSubscription: isWatch(viewerSubscription)
							? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
							: VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
					}}
				>
					{(updateSubscription, { data, loading, error }) => (
						<Button
							className="RepositoryItem-title-action"
							data-test-id="updateSubscription"
							onClick={updateSubscription}
						>
							{watchers.totalCount}{' '}
							{isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
						</Button>
					)}
				</Mutation>

				{!viewerHasStarred ? (
					<Mutation
						mutation={STAR_REPOSITORY}
						variables={{ id }}
						update={updateAddStar}
					>
						{(addStar, { data, loading, error }) => (
							<Button
								className={'RepositoryItem-title-action'}
								onClick={addStar}
							>
								{stargazers.totalCount} Star
							</Button>
						)}
					</Mutation>
				) : (
					<Mutation mutation={UNSTAR_REPOSITORY} variables={{ id }}>
						{(removeStar, { data, loading, error }) => (
							<Button
								className="RepositoryItem-title-action"
								onClick={removeStar}
							>
								{stargazers.totalCount} Unstar
							</Button>
						)}
					</Mutation>
				)}

				{/* Here comes your updateSubscription mutation */}
			</div>
		</div>

		<div className="RepositoryItem-description">
			<div
				className="RepositoryItem-description-info"
				dangerouslySetInnerHTML={{ __html: descriptionHTML }}
			/>
			<div className="RepositoryItem-description-details">
				<div>
					{primaryLanguage && (
						<span>Language: {primaryLanguage.name}</span>
					)}
				</div>
				<div>
					{owner && (
						<span>
							Owner: <a href={owner.url}>{owner.login}</a>
						</span>
					)}
				</div>
			</div>
		</div>
	</div>
);

export default graphql(WATCH_REPOSITORY)(RepositoryItem);
