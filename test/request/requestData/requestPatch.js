const requestDataLpn = require('./requestDataLpn.js');
const requestDataOnlyRequiredFields = require('./requestDataOnlyRequiredFields');

module.exports = {
  lpnsId: [`${requestDataLpn.lpn[0].lpnId}`,
  `${requestDataOnlyRequiredFields.lpn[0].lpnId}`]
}
