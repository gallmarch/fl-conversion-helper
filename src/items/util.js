/* eslint-disable import/prefer-default-export */
export function findMatch() {
  // Delegate the onclick behaviour to the real item (which is wired up to the React app)
  const { id, possessions } = this.props;

  const match = possessions.find(el => el.id === Number(id));
  if (!match) {
    return null;
  }

  const selector = `[data-quality-id="${id}"] > [role="button"]`;
  return {
    data: match,
    element: document.querySelector(selector),
  };
}
