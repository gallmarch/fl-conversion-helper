import $ from 'jquery';

const storage = chrome.storage.sync || chrome.storage.local;

$(document).ready(() => {
  loadOptions();

  $('.flch-popup__option input').each(function() {
    $(this).on('change', (evt) => {
      // Get target and checked value
      const target = $(this).attr('data-target');
      const value = $(this).is(':checked');
      // Retrieve all options, then overwrite the value for this
      storage.get(null, ({ options }) => {
        storage.set({ options: Object.assign(options, { [target]: value }) });
      });
    });
  });
});

function loadOptions() {
  storage.get(null, ({ options }) => {
    Object.keys(options).forEach((key) => {
      $(`input[data-target="${key}"]`).attr('checked', options[key]);
    });
  });
}
