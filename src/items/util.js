export function findMatch() {
    // Delegate the onclick behaviour to the real item (which is wired up to the React app)
    const { id, possessions } = this.props;
    const match = possessions.find(el => el.Id === Number(id));
    if (!match) {
      return null;
    }
    const { Name: name } = match;
    const selector = `.stack-content > div:not(.flch-content-container) img[alt="${name}"]`;
    return {
      data: match,
      element: document.querySelector(selector),
    };
  }
