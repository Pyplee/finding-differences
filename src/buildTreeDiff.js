import _ from 'lodash';

const getLeaf = (key, type, value) => ({ key, type, value });
const getParents = (key, type, children) => ({ key, type, children });
const getChangedLeaf = (key, type, oldValue, newValues) => ({
  key, type, oldValue, newValues,
});

const buildTreeDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return getParents(key, 'uchanged', buildTreeDiff(data1[key], data2[key]));
    }
    if (!_.has(data1)) {
      return getLeaf(key, 'added', data2[key]);
    }
    if (!_.has(data2)) {
      return getLeaf(key, 'removed', data1[key]);
    }
    return getChangedLeaf(key, 'unchanged', data1[key], data2[key]);
  });
  return result;
};

export default buildTreeDiff;
