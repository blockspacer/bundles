'use strict';

const isISODate = require('is-iso-date');

async function formatDateStringToIsoDate(str) {
  let testString = isISODate;
  if (typeof str !== 'undefined' && str !== null) {
    if (testString(str)) {
      str = new Date(str);
    } else {
      let dtParts = str.split('-');
      str = new Date(dtParts[0], dtParts[1] - 1, dtParts[2]);
    }
  }
  return str;
}

module.exports = formatDateStringToIsoDate;
