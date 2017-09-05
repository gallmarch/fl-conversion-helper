const CATEGORY_EXPANSION = 'preferences/category-expansion';

function setExpanded({ category, expanded }) {
  return (dispatch) => {
    dispatch({ type: CATEGORY_EXPANSION, payload: { category, expanded } });
  };
}

export {
  setExpanded,
  CATEGORY_EXPANSION,
};
