'use strict';

const Router = require('koa-router');
const { core } = require('../controllers');

const api = `api/${process.env.API_VERSION}/customer-orders/lpn`;
const router = new Router();
router.prefix(`/${api}`);
router.get('/core', core.getApiInfo);
router.get('/spec', core.getSwaggerSpec);

module.exports = router;
