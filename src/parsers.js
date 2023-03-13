import { load } from 'js-yaml';

const getParse = (file, extension) => {
  switch (extension) {
    case '.yaml':
      return load(file);
    case '.yml':
      return load(file);
    case '.json':
      return JSON.parse(file);
    default:
      return 'Parser error';
  }
};

export default getParse;
