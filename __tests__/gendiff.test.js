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

const cases = [
  ['stylishOutput.txt', 'stylish', 'file1.json', 'file2.json'],
  ['stylishOutput.txt', 'stylish', 'file1.yml', 'file2.yml'],
  ['stylishOutput.txt', 'stylish', 'file1.yaml', 'file2.yaml'],
  ['plainOutput.txt', 'plain', 'file1.json', 'file2.json'],
  ['plainOutput.txt', 'plain', 'file1.json', 'file2.json'],
  ['plainOutput.txt', 'plain', 'file1.json', 'file2.json'],
  ['output.json', 'json', 'file1.json', 'file2.json'],
];

test.each(cases)('Test all formats and all styles', (output, style, file1, file2) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), style)).toEqual(getRead(output));
});

test('Test error', () => {
  expect((genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'AUF'))).toEqual('Style: AUF is undefined, check spelling or print help - \'gendiff -h\'');
});
