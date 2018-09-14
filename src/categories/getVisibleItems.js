import { createSelector } from 'reselect';

const getFilterString = ({ possessions: { filterString } }) => filterString;
const getPossessions = ({ possessions: { possessions } }) => possessions;

const inputFuncs = [getFilterString, getPossessions];
const outputFunc = (filterString, possessions) => {
  // Filter out items excluded by the filter string
  const visibleItems = possessions.filter(
    _ => _.name.toLowerCase().indexOf(filterString.toLowerCase()) >= 0,
  );
  // Return a map of id => object
  const map = visibleItems.reduce((acc, next) => ({ ...acc, [next.id]: next }), {});
  return map;
};

const getVisibleItems = createSelector(inputFuncs, outputFunc);
export default getVisibleItems;
