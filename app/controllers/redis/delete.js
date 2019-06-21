'use strict';

const redis = ({ rediscache, logger }) => ({
  deleteDataFromCache: async (orderId, id) => {
    let redisClient = rediscache.getRedis();
    const productKey = `order:${orderId}:lpn:${id}:lpns`;
    logger.info('Deleting data from REDIS');
    await redisClient.del(productKey).then(() => logger.info('Data deleted from REDIS'))
      .catch(e => {
        logger.error('Error when deleting from REDIS', e.message);
      });
  }
});

module.exports = {
  redis
};
