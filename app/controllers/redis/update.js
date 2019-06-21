'use strict;';
const redis = ({ rediscache, logger }) => ({
  updateDataInCache: async (ctx, data) => {
    let redisClient = rediscache.getRedis();

    const productKey = `order:${ctx.request.body.orderId || ctx.params.orderId}:lpn:${ctx.request.body.lpn.lpnId || ctx.params.id}:lpns`;
    const countKey = `order:${ctx.request.body.orderId || ctx.params.orderId}:lpn:${ctx.request.body.lpn.lpnId || ctx.params.id}:count`;

    await redisClient.hmset(productKey, countKey, JSON.stringify(data)).then(() => logger.info('Data updated in REDIS'))
      .catch(e => {
        logger.error('ERROR when saving into REDIS', e.message);
      });
    return data;
  },
  patchInCache: async (data) => {
    let redisClient = rediscache.getRedis();
    const productKey = `order:${data.orderId}:lpn:${data.lpn[0].lpnId}:lpns`;
    const countKey = `order:${data.orderId}:lpn:${data.lpn[0].lpnId}:count`;
    await redisClient.hmset(productKey, countKey, JSON.stringify(data)).then(() => logger.info('Data updated in REDIS'))
      .catch(e => {
        logger.error('ERROR when saving into REDIS', e.message);
      });
    return data;
  }
});

module.exports = {
  redis
};
