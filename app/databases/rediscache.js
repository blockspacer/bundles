'use strict';

const Redis = require('ioredis');
const logger = require('../logger');

let redisClient;

function getRedis() {
  if (typeof redisClient === 'undefined' || redisClient === null) {
    this.connectToRedis();
    return redisClient;
  } else {
    return redisClient;
  }
}

// Connect to Redis
function connectToRedis() {
  let client = null;
  if (process.env.DEVELOPER === 'true') {
    client = new Redis();
  } else {
    client = new Redis(process.env.REDISPORT, process.env.REDISCACHEHOSTNAME, { password: process.env.REDISCACHEKEY, tls: { servername: process.env.REDISCACHEHOSTNAME } });
  }

  client.on('connect', () => {
    logger.info('Connected to Redis');
  });
  // Incase any error pops up, log it
  client.on('error', (err) => {
    logger.error(err.message);
  });

  redisClient = client;
}

module.exports = {
  getRedis,
  connectToRedis
};
