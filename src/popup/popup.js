import $ from 'jquery';

const storage = chrome.storage.sync || chrome.storage.local;

$(document).ready(() => {
  loadOptions();

  // Set onchange events for each checkbox
  $('.flch-popup__option input').each(function() {
    $(this).on('change', (evt) => {
      // Get target and checked value
      const target = $(this).attr('data-target');
      const value = $(this).is(':checked');

      // Save updated options, including newly-changed preference
      storage.get(null, ({ options }) => {
        storage.set({ options: Object.assign(options, { [target]: value }) });
      });
    });
  });
});

function loadOptions() {
  storage.get(null, ({ options }) => {
    // If we have something stored, set our checkboxes
    if (options) {
      Object.keys(options).forEach((key) => {
        $(`input[data-target="${key}"]`).attr('checked', options[key]);
      });
    }

    const ids = [1, 2, 3, 4, 'renown'].map(i => `js-flch-header-tier-${i}`);

    // Store preferences immediately (this puts defaults into storage)
    storage.set({
      options: ids.reduce((acc, id) => ({ ...acc, [id]: $(`input[data-target="${id}"]`).get(0).checked }), {}),
    });
  });
}
