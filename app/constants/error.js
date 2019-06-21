'use strict';

/**
 * Client Failures
 */
module.exports.AUTH_REQUIRED = {
  statusCode: 401,
  code: 'AUTH_REQUIRED',
  message: 'Authentication is needed to access the requested endpoint.'
};

module.exports.UNKNOWN_ENDPOINT = {
  statusCode: 404,
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.'
};

module.exports.UNKNOWN_RESOURCE = {
  statusCode: 404,
  code: 'UNKNOWN_RESOURCE',
  message: 'The specified resource was not found.'
};

module.exports.INVALID_REQUEST = {
  statusCode: 423,
  code: 'INVALID_REQUEST',
  message: 'The request has invalid parameters.'
};


/**
 * Server Errors
 */
module.exports.INTERNAL_ERROR = {
  statusCode: 500,
  code: 'INTERNAL_ERROR',
  message: 'The server encountered an internal error.'
};

module.exports.UNKNOWN_ERROR = {
  statusCode: 500,
  code: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.'
};

/**
 * DB Errors
 */
module.exports.DUPLICATE_KEY_ERROR = {
  statusCode: 422,
  code: 'MongoError',
  message: 'E11000 duplicate key error.'
};

/**
 * JOI Errors
 */
module.exports.VALIDATE_ERROR = {
  statusCode: 400,
  code: 'ValidateError'
};
