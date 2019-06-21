'use strict';

const redis = ({ rediscache, logger }) => ({
  findByIdInCache: async ctx => {
    let redisClient = rediscache.getRedis();
    const productKey = `order:${ctx.params.orderId}:lpn:${ctx.params.id}:lpns`;
    const countKey = `order:${ctx.params.orderId}:lpn:${ctx.params.id}:count`;
    let response = null;
    //   await redisClient.hmgetAsync(productKey, countKey)
    await redisClient
      .hmget(productKey, countKey)
      .then(product => {
        logger.info('Query response from REDIS');
        response = JSON.parse(product);
      })
      .catch(e => {
        logger.info('Not found in REDIS');
        logger.info(e.message);
        response = null;
      });
    return response;
  }
});

module.exports = {
  redis
};
