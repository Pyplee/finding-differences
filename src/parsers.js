// eslint-disable-next-line import/no-extraneous-dependencies
import { load } from 'js-yaml';

const getParse = (file, extension) => {
  if (extension === 'yaml' || extension === 'yml') {
    return load(file);
  }
  if (extension === 'js') {
    return JSON.parse(file);
  }
  return false;
};

export default getParse;
