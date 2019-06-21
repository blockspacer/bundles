'use strict';

const Router = require('koa-router');
const Joi = require('@hapi/joi');
const { INTERNAL_ERROR, DUPLICATE_KEY_ERROR } = require('../constants/error');
const { isoDate, schema, dto } = require('../utils');
const logger = require('../logger');
const { mongodb, rediscache } = require('../databases');
const { add, find, remove, update } = require('../controllers');

const api = `api/${process.env.API_VERSION}/customer-orders`;

const postMethod = add.handlers({ mongodb, rediscache, logger, isoDate, schema, Joi, DUPLICATE_KEY_ERROR });
const getMethod = find.handlers({ mongodb, rediscache, logger, dto, INTERNAL_ERROR });
const deleteMethod = remove.handlers({ mongodb, rediscache, logger, INTERNAL_ERROR });
const putMethod = update.handlers({ mongodb, rediscache, logger, isoDate, schema, Joi, dto, DUPLICATE_KEY_ERROR, INTERNAL_ERROR });

const router = new Router();
router.prefix(`/${api}`);
router.get('/lpn', getMethod.getAll);
router.get('/lpn/order/:orderId/lpnid/:id', getMethod.getById);
router.get('/lpn/reception-doc-type/:id', getMethod.getByReceptionDocumentType);
router.post('/lpn', postMethod.post);
router.put('/lpn/order/:orderId/lpnid/:id', putMethod.put);
router.patch('/lpn/status-update', putMethod.patch);
router.delete('/lpn/order/:orderId/lpnid/:id', deleteMethod.delete);

module.exports = router;
