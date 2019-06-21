'use strict';

const MongoClient = require('mongodb');
const logger = require('../logger');
const pkginfo = require('../../package.json');

let database;
let cli;
let connString = `mongodb://${process.env.MONGODBHOSTNAME}:${
  process.env.MONGODBKEY
}${process.env.MONGODBSCHEMA}`;

/* eslint func-names: ["error", "never"] */
function getDb() {
  if (typeof database === 'undefined' || database === null) {
    logger.info('Starting DB after undefined');
    this.connectToDb();
    return database;
  } else {
    return database;
  }
}

function getConnString() {
  return connString;
}

function getClient() {
  if (typeof cli === 'undefined' || cli === null) {
    logger.info('Starting DB after undefined');
    this.connectToDb();
    return cli;
  } else {
    return cli;
  }
}

function connectToDb() {
  const options = {
    useNewUrlParser: true,
    poolSize: process.env.MONGODBPOOLSIZE,
    appname: pkginfo.name,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
  };
  if (process.env.DEVELOPER === 'true') {
    connString = 'mongodb://localhost:27017';
  } else {
    connString;
  }
  MongoClient.connect(connString, options)
    .then(client => {
      let db;
      if (process.env.NODE_ENV === 'test') {
        db = client.db('test');
      } else {
        db = client.db('corp');
      }
      cli = client;
      const collection = db.collection('lpn');
      collection.createIndex({ 'lpn.lpnId': 1 }, { unique: true });
      database = collection;
    })
    .then(() => {
      logger.info('Connected to MongoDB API');
    })
    .catch(err => logger.error(err));
}

module.exports = {
  connectToDb,
  getClient,
  getDb,
  getConnString
};
