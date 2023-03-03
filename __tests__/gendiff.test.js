// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getRes = () => readFileSync(getFixturePath('expected_file.txt'), 'utf8');
const result = getRes();

test('Test gendiff', () => {
  expect((genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))).toEqual(result);
});
