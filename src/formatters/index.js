import buildStylish from './stylish.js';
import buildPlain from './plain.js';

const identifyStyleAndCall = (treeDiff, style) => {
  switch (style) {
    case 'stylish':
      return buildStylish(treeDiff);
    case 'plain':
      return buildPlain(treeDiff);
    case 'json':
      return JSON.stringify(treeDiff);
    default:
      return `Style: ${style} is undefined, check spelling or print help - 'gendiff -h'`;
  }
};

export default identifyStyleAndCall;
