import fs, { readFileSync } from 'fs';
import getArrDiff from './getArrDiff.js';

const getReadFile = (file) => readFileSync(file, 'utf8');

const getParseFile = (file) => JSON.parse(file);

const getPrepare = (file) => {
	const readedFile = getReadFile(file);
	return getParseFile(readedFile);
};

const genDiff = (filepath1, filepath2) => {
	const data1 = getPrepare(filepath1);
	const data2 = getPrepare(filepath2);
	const result = getArrDiff(data1, data2);
	return result.join('\n');
}

export default genDiff;