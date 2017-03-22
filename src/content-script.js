import $ from 'jquery';
import MutationSummary from 'mutation-summary';

import { conversionCost, tier1, tier2, tier3 } from './items';
import './styles.scss';

const observer = registerSideConversionObserver();

function registerSideConversionObserver() {
  const rootNode = document.querySelector('.you_bottom_rhs');
  const queries = [{ element: '*' }];

  return new MutationSummary({
    rootNode,
    callback,
    queries,
  });

  function callback() {
    // Add the new category if we don't have it already
    if ($('.you_bottom_rhs .explanation').length) {

      const firstCategory = $($('.you_bottom_rhs h3').get(0));

      $(`#js-flch-header-tier1`).length || insertCategory({
        id: 'js-flch-header-tier1',
        title: 'Tier 1',
        items: tier1,
        firstCategory,
      });
      $(`#js-flch-header-tier2`).length || insertCategory({
        id: 'js-flch-header-tier2',
        title: 'Tier 2',
        items: tier2,
        firstCategory,
      });
      $(`#js-flch-header-tier3`).length || insertCategory({
        id: 'js-flch-header-tier3',
        title: 'Tier 3',
        items: tier3,
        firstCategory,
      });
    }
  }
}

function insertCategory({
  id,
  items,
  title,
  firstCategory,
}) {
  // Outline the skeleton of our category
  const header = $(`
    <h3 id="${id}" class="flch-header">
      <span class="expand flch-toggle">+</span>
      <span class="contract flch-toggle">-</span>
      &nbsp;
      <a href="#" class="flch-link">
        ${title}
      </a>
    </h3>
  `);

  // Put our categories at the top
  //$('.you_bottom_rhs p.explanation').after(header);
  firstCategory.before(header);


  // Create our list of convertible items
  const list = $('<ul />').addClass('you_icon cf');
  header.after(list);

  // Start contracted by default
  $(`#${id}`).find('.contract').css({display: 'none'});
  $(`#${id}`).next().css({ display: 'none' });

  // Use whichever storage we have access to
  const storage = chrome.storage.sync || chrome.storage.local;

  // Retrieve stored expand/contract preference
  storage.get(null, (options) => {
    if (options[id]) {
      $(`#${id}`).find('.contract').css({display: 'inline'});
      $(`#${id}`).find('.expand').css({display: 'none'});
      $(`#${id}`).next().css({ display: 'block' });
    }
  });

  // Add clickable expand/contract behaviour
  $(`#${id}`).on('click', { id }, toggleExpansion);

  // Inspect the player's inventory for items with matching IDs
  items.forEach((id) => {
    // Look for a matching ID
    const itemDiv = $(`#infoBarQImage${id}`);

    // If we have a match, then add something to the list
    if (itemDiv.length) {
      // Find the grandparent <li> containing this div
      const li = itemDiv.parent().parent();

      // Get the quantity of items (default to 0 if there's a problem)
      const quantity = parseInt(li.find('.qq').text(), 10) || 0;
      if (quantity >= conversionCost(id)) {
        // If we have enough for a mass conversion, then just show the usual clickable item
        list.append(cloned(li));
      } else {
        // Otherwise, show a dummied-out version
        list.append(dummied(li));
      }
    } else {
      // If we don't find a match, add an empty <li> to show that
      // there's something missing from the side-conversion chain
      list.append($('<li />').addClass('empty-icon flch-empty-icon'));
    }
  });

  /* Return a deep clone of an element with all IDs wiped */
  function cloned(li) {
    // Make a deep clone of the element
    const clone = li.clone(true, true);
    // Ensure that we're not going to break any FL code that
    // relies on unique IDs
    clone.find('*').removeAttr('id');
    return clone;
  }

  /* Return a visibly disabled and unclickable item representation */
  function dummied(li) {
    const link = $('<a />')
      .addClass('tooltip flch-unlock')
      .append(li.find('.qq').clone()) // quantity
      .append(li.find('img').clone()) // image
      .append(li.find('.tt').clone()); // tooltip
    return $('<li />').append(link);
  }

  /* Expand/contract the category, and store the user's preference */
  function toggleExpansion({ data: { id } }) {
    // Toggle visibilities
    $(this).find('.expand, .contract').toggle();
    $(this).next().toggle();

    // Store the preference
    const expanded = $(this).find('.contract').css('display') === 'block';
    storage.set({ [id]: expanded });

    // Kill the event
    return false;
  }
}
