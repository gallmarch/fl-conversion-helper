import $ from 'jquery';
import MutationSummary from 'mutation-summary';

import ids from './items';
import './styles.scss';

const id = 'js-flch-container';
const observer = registerObserver();

function registerObserver() {

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
      $(`#${id}`).length || insertCategory();
    }
  }

}

function insertCategory() {
  // Outline the skeleton of our category
  const container= $(`
    <div id="${id}" class="flch-container">
      <h3>
        <span class="expand flch-toggle">+</span>
        <span class="contract flch-toggle">-</span>
        &nbsp;
        <a href="#" class="flch-link--unstyled">
          Side Conversion
        </a>
      </h3>
    </div>
  `);

  // Find the first visible category and put our new category
  // in front of it
  const firstCategory = $('.you_bottom_rhs h3:first');
  firstCategory.before(container);

  // Create our list of convertible items
  const list = $('<ul />').addClass('you_icon cf');
  container.append(list);

  // Start contracted
  $(`#${id}`).find('.contract, ul').css({display: 'none'});

  // Add clickable expand/contract behaviour
  $(`#${id} h3`).on('click', function() {
    $(this).parent().find('.expand, .contract, ul').toggle();
    return false;
  });

  // Inspect the player's inventory for items with matching IDs
  ids.forEach((id) => {
    // Look for a matching ID
    const itemDiv = $(`#infoBarQImage${id}`);

    // If we have a match, then add something to the list
    if (itemDiv) {
      // Find the grandparent <li> containing this
      const li = itemDiv.parent().parent();

      // Get the quantity of items (default to 0 if there's a problem)
      const quantity = parseInt(li.find('.qq').text(), 10) || 0;

      if (quantity >= 50) {
        // If we have at least 50, then just show the usual clickable item
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
}
