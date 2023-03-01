import _ from 'lodash';

const getArrDiff = (data1, data2) => {
	const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
	const result = keys.map((key) => {
		if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
			const acc = data1[key] === data2[key] ? [`	  ${key}: ${data1[key]}`] : [`	- ${key}: ${data1[key]}`, `	+ ${key}: ${data2[key]}`];
			return acc;
		}
		if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
			return [`	- ${key}: ${data1[key]}`];
		}
		if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
			return [`	+ ${key}: ${data2[key]}`];
		}
	});
	return result.flat(1);
};

export default getArrDiff;