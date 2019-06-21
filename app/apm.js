'use strict';
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const apm = {
  collectors: [
    {
      collector: 'Prometheus',
      active: !!process.env.PROMETHEUS && process.env.PROMETHEUS === 'on'
    }
  ]
};

// Add this to the VERY top of the first file loaded in your app
module.exports = apm;
