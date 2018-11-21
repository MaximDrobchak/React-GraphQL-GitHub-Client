import axios from 'axios';

export const defaultFetch = axios.create({
	method: 'GET',
	baseURL: 'https://min-api.cryptocompare.com',
});

export const getCryptocurrencyList = (list, setLengthList = 100) => {
	let newList;
	if (list.length >= setLengthList) {
		newList = list.splice(0, setLengthList);
		return newList;
	}
	return list;
};

export function resolveCoinlistQuery(queryResult) {
	const result = [];
	Object.values(queryResult.data.Data).map(item => result.push(item));
	return [...result];
}
