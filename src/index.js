import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import getDiffForGen from './getDiffForGen.js';
import getParse from './parsers.js';

const getReadFile = (file) => readFileSync(file, 'utf8');
const getExtension = (filepath) => extname(filepath);

const getPrepare = (file, format) => {
  const readedFile = getReadFile(file);
  return getParse(readedFile, format);
};

const getFullPathToFile = (filepath) => resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const fullPath1 = getFullPathToFile(filepath1);
  const fullPath2 = getFullPathToFile(filepath2);

  const tree1 = getPrepare(fullPath1, getExtension(filepath1));
  const tree2 = getPrepare(fullPath2, getExtension(filepath2));

  const result = getDiffForGen(tree1, tree2);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
