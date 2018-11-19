import React, { Component } from 'react';

import Profile from '../Profile';

import './style.scss';

class AopolloClient extends Component {
	render() {
		return (
			<div className="apollo-client">
				<Profile />
			</div>
		);
	}
}

export default AopolloClient;
