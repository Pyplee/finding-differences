// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getRead = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const result = getRead('resultGenDiff.txt');

test('Test gendiff', () => {
  expect((genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))).toEqual(result);
  expect((genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))).toEqual(result);
  expect((genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))).toEqual(result);
});
