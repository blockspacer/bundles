'use strict';

// const { mongodb } = require('../databases');

/**
 * @swagger
 * /api/v1/customer-orders/lpn/status/healthy:
 *   get:
 *     tags:
 *     - Healthy check
 *     summary: Healthy check.
 *     operationId: healthy
 *     responses:
 *       '200':
 *         x-summary: success
 *         description:  Get status of database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthySuccessResponse'
 *       '500':
 *         x-summary: Internal Server Error
 *         description: Database offline
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthyErrorResponse'
 */
const handler = ({ mongodb }) => ({
  getHealthy: async ctx => {
    let client;
    client = await mongodb.getClient();
    let status = await client.isConnected();

    if (status) {
      return ctx.res.ok({ data: status, message: 'MongoDb Ok!' });
    } else {
      return ctx.res.internalServerError({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
});

module.exports = {
  handler
};
