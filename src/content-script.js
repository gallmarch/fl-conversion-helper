import $ from 'jquery';
import MutationSummary from 'mutation-summary';

import insertCategory from './insert-category';
import { tier1, tier2, tier3, tier4 } from './items';
import './styles.scss';

registerObserver();
listenForStorageChanges();

function registerObserver() {
  const rootNode = document.querySelector('.you_bottom_rhs');
  const queries = [{ element: '*' }];

  return new MutationSummary({
    rootNode,
    callback,
    queries,
  });

  function callback() {
    // Add each tier's category if we don't have it already
    if ($('.you_bottom_rhs .explanation').length) {

      // Get a reference to the 'Academic' category (the
      // first category in the list)
      const firstCategory = $($('.you_bottom_rhs h3').get(0));

      // Insert Tier 1
      $(`#js-flch-header-tier1`).length || insertCategory({
        id: 'js-flch-header-tier1',
        title: 'Tier 1',
        items: tier1,
        firstCategory,
      });

      // Insert Tier 2
      $(`#js-flch-header-tier2`).length || insertCategory({
        id: 'js-flch-header-tier2',
        title: 'Tier 2',
        items: tier2,
        firstCategory,
      });

      // Insert Tier 3
      $(`#js-flch-header-tier3`).length || insertCategory({
        id: 'js-flch-header-tier3',
        title: 'Tier 3',
        items: tier3,
        firstCategory,
      });

      // Insert Tier 4
      $(`#js-flch-header-tier4`).length || insertCategory({
        id: 'js-flch-header-tier4',
        title: 'Tier 4',
        items: tier4,
        firstCategory,
      });
    }
  }
}

/* 
 * Listen for storage changes (specifically as a result of the user's
 * interaction with the popup) and update categories' visibility
 * accordingly.
 */
function listenForStorageChanges() {
  chrome.storage.onChanged.addListener(({ options }) => {
    // We're only interested in changes to visibility arising
    // from interactions with the popup
    if (!options) {
      return;
    }

    const { newValue } = options;
    Object.keys(newValue).forEach((k) => {
      if ((newValue[k])) {
        // If newValue[k] is truthy, then we want to display the category
        $(`#${k}`)
          .removeClass('flch-hidden')
          .next()
          .removeClass('flch-hidden');
      } else {
        // Otherwise,we want to hide it
        $(`#${k}`)
          .addClass('flch-hidden')
          .next()
          .addClass('flch-hidden');
      }
    });
  });
}
