import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import buildTreeDiff from './buildTreeDiff.js';
import getParse from './parsers.js';
import identifyStyleAndCall from './formatters/index.js';

const getReadFile = (file) => readFileSync(file, 'utf8');
const getExtension = (filepath) => extname(filepath);
const getFullPathToFile = (filepath) => resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = getFullPathToFile(filepath1);
  const fullPath2 = getFullPathToFile(filepath2);

  const readedFile1 = getReadFile(fullPath1);
  const readedFile2 = getReadFile(fullPath2);

  const obj1 = getParse(readedFile1, getExtension(filepath1));
  const obj2 = getParse(readedFile2, getExtension(filepath2));

  const treeDiff = buildTreeDiff(obj1, obj2);

  return identifyStyleAndCall(treeDiff, format);
};

export default genDiff;
