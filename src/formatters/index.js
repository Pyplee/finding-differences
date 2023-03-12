import buildStylish from './stylish.js';
import buildPlain from './plain.js';

const identifyStyleAndCall = (treeDiff, style) => {
  if (style === 'stylish') {
    return buildStylish(treeDiff);
  }
  if (style === 'plain') {
    return buildPlain(treeDiff);
  }
  if (style === 'json') {
    return JSON.stringify(treeDiff);
  }
  return `Style: ${style} is undefined, check spelling or print help - 'gendiff -h'`;
};

export default identifyStyleAndCall;
