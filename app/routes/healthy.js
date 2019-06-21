'use strict';

const Router = require('koa-router');
const { mongodb } = require('../databases');
const { healthy } = require('../controllers');
const api = `api/${process.env.API_VERSION}/customer-orders/lpn`;
const getMethod = healthy.handler({ mongodb });
const router = new Router();
router.prefix(`/${api}`);
router.get('/status/healthy', getMethod.getHealthy);

module.exports = router;
