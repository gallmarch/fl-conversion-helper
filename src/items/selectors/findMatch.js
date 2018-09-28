import createCachedSelector from 're-reselect';

const getId = (state, { id }) => id;
const getPossessions = ({ possessions: { possessions } }) => possessions;

const cacheKey = getId;

const inputFuncs = [getId, getPossessions];

const outputFunc = (id, possessions) => {
  const match = possessions.find(el => el.id === Number(id));
  if (!match) {
    return null;
  }

  const selector = `[data-quality-id="${id}"] > [role="button"]`;
  return {
    data: match,
    element: document.querySelector(selector),
  };
};

export default createCachedSelector(inputFuncs, outputFunc)(cacheKey);
