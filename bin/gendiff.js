#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>', 'path to file1')
  .arguments('<filepath1>', 'path to file2')
  .option('-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

program.parse(process.argv);
