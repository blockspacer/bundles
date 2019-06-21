#!/usr/bin/env node

'use strict';

// Load APM on production environment
const config = require('./config');
const apm = require('./apm');
const App = require('./app');
const logger = require('./logger');
const app = new App();

const prometheus = apm.collectors[0];

function init(app) {
  app.listen(config.port, config.host, () => {
    logger.info(
      { event: 'execute' },
      `API server listening on ${config.host}:${config.port}, in ${config.env}`
    );
  });
  return app;
}

function metricsRequest(err, ctx) {
  if (prometheus.active) {
    // eslint-disable-next-line no-undef
    meters.totalNumberRequests.inc();
    // eslint-disable-next-line no-undef
    meters.requestRate.mark();
  }

  if (ctx == null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
}

function handleError(err, ctx) {
  if (prometheus.active) {
    // eslint-disable-next-line no-undef
    meters.errorRate.mark(1);
  }
  if (ctx == null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
}

async function terminate(signal) {
  try {
    await app.terminate();
  } finally {
    logger.info({ signal, event: 'terminate' }, 'App is terminated');
    process.kill(process.pid, signal);
  }
}

// Handle uncaught errors
app.on('error', handleError);

// Start server
if (!module.parent) {
  let server;
  server = init(app);

  server.on('error', handleError);
  server.on('request', metricsRequest);

  const errors = ['unhandledRejection', 'uncaughtException'];

  errors.map(error => {
    process.on(error, handleError);
  });

  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signals.map(signal => {
    process.once(signal, () => terminate(signal));
  });
}

// Expose app
module.exports = app;
