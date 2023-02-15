#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('3.4.4')
  .option('-f, --format <type>', 'output format', 'stylish')
  .parse(process.argv);