import React from 'react';

import './style.scss';

const ErrorMessage = ({ error }) => (
	<div className="ErrorMessage">
		<small>{error.toString()}</small>
	</div>
);

export default ErrorMessage;
