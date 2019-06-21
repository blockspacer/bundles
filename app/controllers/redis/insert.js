'use strict';

const redis = ({ rediscache, logger }) => ({
  saveDataIntoCache: async (data) => {
    let redisClient = rediscache.getRedis();
    const productKey = `order:${data.orderId}:lpn:${data.lpn[0].lpnId}:lpns`;
    const countKey = `order:${data.orderId}:lpn:${data.lpn[0].lpnId}:count`;
    try {
      await redisClient.hmset(productKey, countKey, JSON.stringify(data)).then(() => logger.info('Data saved into REDIS'))
        .catch(e => {
          logger.error('ERROR when saving into REDIS', e.message);
        });
      return data;
    } catch (err) {
      logger.info(err);
      throw err;
    }
  }
});

module.exports = {
  redis
};
