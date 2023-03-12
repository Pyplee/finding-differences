import _ from 'lodash';

const getValueFormat = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const buildPlain = (diff, fileName = []) => {
  const {
    name, type, value, children, oldValue, newValue,
  } = diff;
  const nestedKey = [...fileName, name];
  const joinPath = nestedKey.join('.');
  switch (type) {
    case 'root': {
      const result = children.filter((child) => child.type !== 'unchanged')
        .flatMap((child) => buildPlain(child, []));
      return result.join('\n');
    }
    case 'nested': {
      const result = children.filter((child) => child.type !== 'unchanged')
        .flatMap((child) => buildPlain(child, nestedKey));
      return result.join('\n');
    }
    case 'added':
      return `Property '${joinPath}' was added with value: ${getValueFormat(value)}`;
    case 'removed':
      return `Property '${joinPath}' was removed`;
    case 'changed': {
      return `Property '${joinPath}' was updated. From ${getValueFormat(oldValue)} to ${getValueFormat(newValue)}`;
    }
    default: return `Type: ${type} is undefined`;
  }
};

export default buildPlain;
