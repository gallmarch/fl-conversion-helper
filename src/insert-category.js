import $ from 'jquery';

import { conversionCost } from './items';

// Use whichever storage we have access to
const storage = chrome.storage.sync || chrome.storage.local;

export default function insertCategory({
  id,
  items,
  title,
  firstCategory,
}) {
  // Outline the skeleton of our category header
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

  // Insert before the first FL category
  firstCategory.before(header);

  // Create our list of convertible items and insert it after the header
  const list = $('<ul />').addClass('you_icon cf');
  header.after(list);

  // Start contracted by default
  $(`#${id}`).find('.contract').css({display: 'none'});
  $(`#${id}`).next().css({ display: 'none' });

  // Retrieve stored visibility and expand/contract preferences
  storage.get(null, (options) => { setCategoryVisibility({ options, id }) });

  // Add clickable expand/contract behaviour
  $(`#${id}`).on('click', { id }, toggleExpansion);

  // Inspect the player's inventory for items with matching IDs
  items.forEach((id) => { list.append(itemOrEmptySlot(id)) });
}

/*
 * Return either a (clickable) clone of an item, a dummied-out version,
 * or an empty slot
 */
function itemOrEmptySlot(id) {
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
      return cloned(li);
    } else {
      // Otherwise, show a dummied-out version
      return dummied(li);
    }
  }

  // If we don't find a match, add an empty <li> to show that
  // there's something missing from the tier
  return $('<li />').addClass('empty-icon flch-empty-icon');
}

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
  const expanded = $(this).find('.contract').css('display') === 'inline';
  storage.set({ [id]: expanded });

  // Kill the event
  return false;
}

function setCategoryVisibility({ options, id }) {
  // Check whether the user wants this displayed at all
  if (options.options && options.options[id] !== undefined) {
    if (options.options[id]) {
      $(`#${id}`)
        .removeClass('flch-hidden')
        .next()
        .removeClass('flch-hidden');
    } else {
      $(`#${id}`)
        .addClass('flch-hidden')
        .next()
        .addClass('flch-hidden');
    }
  }

  // If the key for this category is truthy, then expand it
  if (options[id]) {
    // Show the 'contract' button
    $(`#${id}`).find('.contract').css({display: 'inline'});
    // Hide the 'expand' button
    $(`#${id}`).find('.expand').css({display: 'none'});
    // Show the item list
    $(`#${id}`).next().css({ display: 'block' });
  }
}
