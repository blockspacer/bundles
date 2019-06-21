const core = require('./core');
const healthy = require('./healthy');
const { add, find, update, remove } = require('./mongo');
const traces = require('./business');
const whmgapi = require('./axios');

module.exports = {
  core,
  healthy,
  add,
  find,
  update,
  remove,
  whmgapi,
  traces
};
