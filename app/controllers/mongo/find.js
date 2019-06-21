'use strict';
const { find } = require('../redis');

const handlers = ({ mongodb, rediscache, logger, dto, INTERNAL_ERROR }) => ({
  getById: async ctx => {
    let db;
    let redis;
    const id = ctx.params.id;
    const orderId = ctx.params.orderId;
    try {
      redis = find.redis({ rediscache, logger });
      const product = await redis.findByIdInCache(ctx);
      if (typeof product === 'undefined' || product === null) {
        logger.info('Searching in DB');
        db = mongodb.getDb();
        await db
          // eslint-disable-next-line quote-props
          .findOne({ orderId: orderId, 'lpn.lpnId': id }, { _id: 0 })
          .then(result => {
            if (!result) {
              return ctx.res.noContent({ message: 'Data not found' });
            }
            logger.info('Data founded in DB');
            let msj = dto.transform(result, 'object');
            return ctx.res.ok({ data: msj, message: 'Data founded in DB' });
          });
      } else {
        logger.info('Data founded in REDIS');
        let msj = dto.transform(product, 'object');
        return ctx.res.ok({ data: msj, message: 'Data founded in REDIS' });
      }
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'NotFoundError') {
        logger.error(error.message);
        ctx.res.internalServerError(INTERNAL_ERROR);
        ctx.app.emit('error', error, ctx);
      }
      logger.error(error.message);
      ctx.status = 500;
      ctx.throw(500, error.message);
    }
  },
  getByReceptionDocumentType: async ctx => {
    let db;
    const id = ctx.params.id;
    try {
      logger.info('Searching in DB');
      db = mongodb.getDb();
      await db
        .find({ 'lpn.receptionDocumentType': id }, { _id: 0 })
        .toArray()
        .then(result => {
          if (!result || result.length === 0) {
            logger.info('No content found');
            return ctx.res.noContent({ message: 'No content found' });
          } else {
            logger.info('Data founded in DB');
            let msj = dto.transform(result, 'array');
            return ctx.res.ok({ data: msj, message: 'Data founded in DB' });
          }
        });
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'NotFoundError') {
        logger.error(error.message);
        ctx.res.internalServerError(INTERNAL_ERROR);
        ctx.app.emit('error', error, ctx);
      }
      logger.error(error.message);
      ctx.status = 500;
      ctx.throw(500, error.message);
    }
  },
  getAll: async ctx => {
    let db;
    try {
      logger.info('Searching in DB');
      db = mongodb.getDb();
      await db
        .find({}, { _id: 0 })
        .toArray()
        .then(result => {
          if (!result || result.length === 0) {
            logger.info('No content found');
            return ctx.res.noContent({ message: 'No content found' });
          } else {
            logger.info('Data founded in DB');
            let msj = dto.transform(result, 'array');
            return ctx.res.ok({ data: msj, message: 'Data founded in DB' });
          }
        });
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'NotFoundError') {
        logger.error(error.message);
        ctx.res.internalServerError(INTERNAL_ERROR);
        ctx.app.emit('error', error, ctx);
      }
      logger.error(error.message);
      ctx.status = 500;
      ctx.throw(500, error.message);
    }
  }
});

module.exports = {
  handlers
};
