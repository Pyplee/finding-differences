import { cwd } from 'node:process';
import fs from 'fs';
import { resolve } from 'node:path';
import getTree from './getTree.js'

const getFullPath = (filepath) => filepath = resolve(cwd(), filepath);
const getReadFile = (path) => fs.readFileSync(path, "utf8");

const gendiff = (filepath1, filepath2) => {

	const fullPath1 = getFullPath(filepath1);
	const fullPath2 = getFullPath(filepath2);
	
	const data1 = getReadFile(fullPath1);
	const data2 = getReadFile(fullPath2);

	const outputDiff = getTree(
    parsesFile(data1),
    parsesFile(data2)
  );

	return outputDiff;
};

export default gendiff;