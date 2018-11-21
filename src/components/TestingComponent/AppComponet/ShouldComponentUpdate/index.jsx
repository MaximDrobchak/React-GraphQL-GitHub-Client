import React from 'react';
import ReactDOM from 'react-dom';
import {
	defaultFetch,
	getCryptocurrencyList,
	resolveCoinlistQuery,
} from '../functions';

import './style.scss';

const modalRoot = document.getElementById('modal-root');
const appRoot = document.getElementById('root');

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}
	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

class ShouldComponentUpdate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			error: null,
			showModal: false,
		};
	}

	componentDidMount() {
		defaultFetch('/data/all/coinlist')
			.then(res =>
				this.setState({
					list: getCryptocurrencyList(resolveCoinlistQuery(res)),
				}),
			)
			.catch(error => this.setState({ error: error.message }));
	}

	handleShow = () => this.setState({ showModal: true });

	handleHide = () => this.setState({ showModal: false });

	render() {
		const modal = this.state.showModal ? (
			<Modal>
				<div className="modal">
					<div>
						With a portal, we can render content into a different part
						of the DOM, as if it were any other React child.
					</div>
					This is being rendered inside the #modal-container div.
					<button onClick={this.handleHide}>Hide modal</button>
				</div>
			</Modal>
		) : null;

		return (
			<React.StrictMode>
				<button onClick={this.handleShow}>Show modal</button>
				{modal}
				<table className="crypto-table" border="1 black">
					<tbody>
						{Object.values(this.state.list).map(item => (
							<tr key={item.Id}>
								<td>{item.Name}</td>
								<td>{item.Id}</td>
								<td>
									<img
										src={
											'https://www.cryptocompare.com' + item.ImageUrl
										}
										alt=""
									/>
								</td>
								<td>{item.FullName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.StrictMode>
		);
	}
}

export default ShouldComponentUpdate;
