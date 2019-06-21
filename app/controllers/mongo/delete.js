'use strict';
const { remove } = require('../redis');

const handlers = ({ mongodb, rediscache, logger, INTERNAL_ERROR }) => ({
  delete: async ctx => {
    logger.info('Deleting data from MongoDB');
    const id = ctx.params.id;
    const orderId = ctx.params.orderId;
    let db;
    let redis;
    db = mongodb.getDb();

    await db
      // eslint-disable-next-line quote-props
      .deleteOne({ orderId: orderId, 'lpn.lpnId': id })
      .then(response => {
        if (response.result.n === 0) {
          return ctx.res.noContent({ message: 'Data not found' });
        } else if (response.result.n === 1) {
          redis = remove.redis({ rediscache, logger });
          redis.deleteDataFromCache(orderId, id);
          return ctx.res.ok({ message: 'Data deleted' });
        }
      })
      .catch(e => {
        logger.error(e.message);
        ctx.res.internalServerError(INTERNAL_ERROR);
        ctx.app.emit('error', e, ctx);
      });
  }
});

module.exports = {
  handlers
};
