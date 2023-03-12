import _ from 'lodash';

const makeSpace = (depth, replace = ' ', spaceCount = 4) => replace.repeat(depth * spaceCount - 2);

const getValueFormat = (data, buildStylish, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((name) => {
    const value = data[name];
    return buildStylish({ name, value, type: 'unchanged' }, depth + 1);
  });
  return `{\n${result.join('\n')}\n  ${makeSpace(depth)}}`;
};

const buildStylish = (diff, depth = 0) => {
  const {
    name, type, value, children, oldValue, newValue,
  } = diff;
  switch (type) {
    case 'root': {
      const resultLine = children.flatMap((child) => buildStylish(child, depth + 1));
      return `{\n${resultLine.join('\n')}\n}`;
    }
    case 'nested': {
      const resultLine = children.flatMap((child) => buildStylish(child, depth + 1));
      return `${makeSpace(depth)}  ${name}: {\n${resultLine.join('\n')}\n${makeSpace(depth)}  }`;
    }
    case 'added':
      return `${makeSpace(depth)}+ ${name}: ${getValueFormat(value, buildStylish, depth)}`;
    case 'removed':
      return `${makeSpace(depth)}- ${name}: ${getValueFormat(value, buildStylish, depth)}`;
    case 'unchanged':
      return `${makeSpace(depth)}  ${name}: ${getValueFormat(value, buildStylish, depth)}`;
    case 'changed': {
      const resultOld = `${makeSpace(depth)}- ${name}: ${getValueFormat(oldValue, buildStylish, depth)}`;
      const resultNew = `${makeSpace(depth)}+ ${name}: ${getValueFormat(newValue, buildStylish, depth)}`;
      return `${resultOld}\n${resultNew}`;
    }
    default:
      return `Type: ${type} is undefined`;
  }
};

export default buildStylish;
