import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import getArrDiff from './getArrDiff.js';

const getReadFile = (file) => readFileSync(file, 'utf8');

const getParseFile = (file) => JSON.parse(file);

const getPrepare = (file) => {
  const readedFile = getReadFile(file);
  return getParseFile(readedFile);
};

const getFullPathToFile = (filepath) => resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const fullPath1 = getFullPathToFile(filepath1);
  const fullPath2 = getFullPathToFile(filepath2);

  const data1 = getPrepare(fullPath1);
  const data2 = getPrepare(fullPath2);

  const result = getArrDiff(data1, data2);

  return result.join('\n');
};

export default genDiff;
