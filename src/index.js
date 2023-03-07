import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import buildTreeDiff from './buildTreeDiff.js';
import getParse from './parsers.js';

const getReadFile = (file) => readFileSync(file, 'utf8');
const getExtension = (filepath) => extname(filepath);
const getFullPathToFile = (filepath) => resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const fullPath1 = getFullPathToFile(filepath1);
  const fullPath2 = getFullPathToFile(filepath2);

  const readFile1 = getReadFile(fullPath1);
  const readFile2 = getReadFile(fullPath2);

  const tree1 = getParse(readFile1, getExtension(filepath1));
  const tree2 = getParse(readFile2, getExtension(filepath2));

  const result = buildTreeDiff(tree1, tree2);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
