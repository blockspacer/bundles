'use strict';

const os = require('os');
const pkginfo = require('../../package.json');
const spec = require('../api-doc/spec');

/**
 * @swagger
 * /api/v1/customer-orders/lpn/core:
 *   get:
 *     tags:
 *     - Application Information
 *     summary: Get a general API information.
 *     operationId: getApiInfo
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               name: 'koa-rest-api-boilerplate'
 *               version: 'v2.0.0'
 *               description: 'Boilerplate for Koa RESTful API application with Docker, Swagger, Jest, Coveralls, and Circle CI'
 *               environments:
 *                 nodeVersion: '10.15.0'
 *                 hostname: 'my-pc'
 *                 platform: 'darwin/x64'
 */
exports.getApiInfo = ctx => {
  // BUSINESS LOGIC
  const environments = {
    nodeVersion: process.versions['node'],
    hostname: os.hostname(),
    platform: `${process.platform}/${process.arch}`
  };
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    environments
  };

  ctx.body = data;
};

/**
 * @swagger
 * /api/v1/customer-orders/lpn/spec:
 *   get:
 *     tags:
 *     - Swagger information specification
 *     summary: Get Open API Specification.
 *     operationId: getSwaggerSpec
 *     responses:
 *       '200':
 *         x-summary: OK
 *         description: Describe Swagger Open API Specification
 */
exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};
